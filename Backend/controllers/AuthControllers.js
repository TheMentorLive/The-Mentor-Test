const User = require("../model/UserModel");
const bcrypt = require('bcryptjs');
const jwt= require("jsonwebtoken")
const dotenv= require("dotenv")
const nodemailer = require('nodemailer');



dotenv.config();
const { generateOtp, sendOtpEmail } = require('../utils/otp');

const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);


const register = async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP and hash password in parallel
    const otp = generateOtp();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    const user = new User({
      email,
      otpExpires: Date.now() + 3600000, // OTP valid for 1 hour
      otp,
      password: hashedPassword,
      role,
      isVerified: false
    });

    // Save user and send OTP email in parallel
    const savedUserPromise = user.save();
    const sendOtpPromise = sendOtpEmail(email, otp);

    await Promise.all([savedUserPromise, sendOtpPromise]);

    // Respond with the saved user
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const verifyOtp = async (req, res) => {
  console.log(req.body);
  
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = null; // Clear OTP
    user.otpExpires = null; // Clear OTP expiry
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// Login Controller
const login = async (req, res) => {
  console.log('Request body:', req.body);
  const { email, password } = req.body;
  
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    console.log('User found:', user);

    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'User account is not verified. Please verify your account first.' });
    }
    console.log('User is verified');

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('Password matched');

    // Generate the JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Token generated:', token);

    // Send the response with the token and user details
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
};


const getUserDetails = async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GOOGLE_EMAIL,  // Replace with your Gmail email address
    pass:process.env.PASS         // Replace with your Gmail password
  }
});


const sendMail= async(req,res)=>{
  const { name, email, message } = req.body;

  try {
    const contact= new ContactModel({
name:name,
email:email,
message:message
    })
    await contact.save()
    // Compose email
    const mailOptions = {
      from: process.env.GOOGLE_EMAIL,
      to: "tpjishnu5@gmail.com", // Replace with your own email address for testing
      subject: 'New Message from Contact Form',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
  
// const admin = require('firebase-admin');
// const serviceAccount = require('../the-mentor-8c4eb-firebase-adminsdk-i7qfm-b7a6e76da4.json');

// // Initialize Firebase Admin SDK
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     // Optionally specify your Firebase project ID and other options
//   });
// }

const sendMobileOtp = async (req, res) => {
  console.log("Request body:", req.body);

  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: 'Mobile number is required.' });
  }

  try {
    // Check if user already exists in the database
    let user = await User.findOne({ mobile });

    // Generate a new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send OTP using Twilio
    await client.messages.create({
      body: `Your MENTOR TEST OTP is ${otp}`,
      to: mobile, // User's mobile number
      from: '+14157924197' // Your Twilio phone number
    });

    console.log(`OTP sent to ${mobile}: ${otp}`);

    if (user) {
      // If user exists, update the OTP
      user.otp = otp;

      // Update verification keyword based on user's verification status
      const keyword = user.isVerified ? 'USER_VERIFIED' : 'USER_NOT_VERIFIED';

      await user.save();
      return res.status(200).json({
        message: 'OTP sent successfully.',
        keyword
      });

    } else {
      // If user does not exist, create a new user with the OTP
      const newUser = new User({ mobile, otp });
      await newUser.save();

      return res.status(200).json({
        message: 'OTP sent successfully.',
        keyword: 'USER_NOT_VERIFIED'
      });
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP.', error: error.message });
  }
};


const verifyMobileOtp = async (req, res) => {
  const { mobile, otp, name } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ message: 'Mobile number and OTP are required.' });
  }

  try {
    // Find OTP entry in the database
    const otpEntry = await User.findOne({ mobile, otp }); // Assuming Otp is a model for storing OTPs

    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid OTP or OTP has expired.' });
    }

    // Find or create the user based on the mobile number
    let user = await User.findOne({ mobile });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({ mobile, name, isVerified: true, role: 'user' }); // Set isVerified to true for new users
    } else {
      // If the user exists, update the user's name and set isVerified to true
      if (name) {
        user.name = name;
      }
      user.isVerified = true; // Update isVerified field
      user.role = 'user'; // Ensure role is set to 'user'
    }

    // Save the user
    const savedUser = await user.save();
    console.log('User saved:', savedUser);

    // Delete the OTP entry from the database
    // await User.deleteOne({ _id: otpEntry._id }); // Assuming Otp is a model for storing OTPs

    // Generate the JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Token generated:', token);

    // Send the response with the token and user details
    res.status(200).json({
      message: 'OTP verified successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Failed to verify OTP.', error: error.message });
    }
  }
};

//email otp login

const sendEmailOtp = async (req, res) => {
  console.log("Request body:", req.body);

  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: 'Mobile number is required.' });
  }

  try {
    // Check if user already exists in the database
    let user = await User.findOne({ mobile });

    // Generate a new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send OTP using Twilio
    await client.messages.create({
      body: `Your MENTOR TEST OTP is ${otp}`,
      to: mobile, // User's mobile number
      from: '+14157924197' // Your Twilio phone number
    });

    console.log(`OTP sent to ${mobile}: ${otp}`);

    if (user) {
      // If user exists, update the OTP
      user.otp = otp;

      // Update verification keyword based on user's verification status
      const keyword = user.isVerified ? 'USER_VERIFIED' : 'USER_NOT_VERIFIED';

      await user.save();
      return res.status(200).json({
        message: 'OTP sent successfully.',
        keyword
      });

    } else {
      // If user does not exist, create a new user with the OTP
      const newUser = new User({ mobile, otp });
      await newUser.save();

      return res.status(200).json({
        message: 'OTP sent successfully.',
        keyword: 'USER_NOT_VERIFIED'
      });
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP.', error: error.message });
  }
};


const verifyEmailOtp = async (req, res) => {
  const { mobile, otp, name } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ message: 'Mobile number and OTP are required.' });
  }

  try {
    // Find OTP entry in the database
    const otpEntry = await User.findOne({ mobile, otp }); // Assuming Otp is a model for storing OTPs

    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid OTP or OTP has expired.' });
    }

    // Find or create the user based on the mobile number
    let user = await User.findOne({ mobile });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({ mobile, name, isVerified: true, role: 'user' }); // Set isVerified to true for new users
    } else {
      // If the user exists, update the user's name and set isVerified to true
      if (name) {
        user.name = name;
      }
      user.isVerified = true; // Update isVerified field
      user.role = 'user'; // Ensure role is set to 'user'
    }

    // Save the user
    const savedUser = await user.save();
    console.log('User saved:', savedUser);

    // Delete the OTP entry from the database
    // await User.deleteOne({ _id: otpEntry._id }); // Assuming Otp is a model for storing OTPs

    // Generate the JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Token generated:', token);

    // Send the response with the token and user details
    res.status(200).json({
      message: 'OTP verified successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Failed to verify OTP.', error: error.message });
    }
  }
};





  
module.exports= {register,
    login,
    getUserDetails,
    sendMail,
    verifyOtp,
    sendMobileOtp,
    verifyMobileOtp,
    sendEmailOtp,
    verifyEmailOtp
}