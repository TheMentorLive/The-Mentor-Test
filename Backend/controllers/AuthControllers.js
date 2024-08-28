const User = require("../model/UserModel");
const bcrypt = require('bcryptjs');
const jwt= require("jsonwebtoken")
const dotenv= require("dotenv")
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
dotenv.config();
const { generateOtp, sendOtpEmail } = require('../utils/otp');


const client = new OAuth2Client(process.env.CLIENTID);


// const twilio = require('twilio');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);






const sendEmailOtp = async (req, res) => {
  console.log("Request body:", req.body);

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    // Generate a new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

  
    let user = await User.findOne({ email });

    if (user) {
      // If user exists, update the OTP and set email verification status
      user.otp = otp;
      // user.role="user"
      user.isEmailVerified = false; // Ensure email verification status is correctly set
      console.log(`Updating existing user: ${email}`);
    } else {
      console.log(user,"logging");
      
      // If user does not exist, create a new user with the OTP
      user = new User({ email, otp, isEmailVerified: false, });
      console.log(`Creating new user: ${email}`,user);
      // await user.save();
    }

    // Save the user with the new OTP
    await user.save();

    // Function to send OTP email
    await sendOtpEmail(email, otp);
    console.log(`Sent OTP to ${email}: ${otp}`);

    return res.status(200).json({
      message: 'OTP sent successfully.',
      keyword: user.isVerified ? 'USER_VERIFIED' : 'USER_NOT_VERIFIED'
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP.', error: error.message });
  }
};





const verifyEmailOtp = async (req, res) => {
  const { email, otp, name } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Mobile number and OTP are required.' });
  }

  try {
   
    const otpEntry = await User.findOne({ email, otp });

    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid OTP or OTP has expired.' });
    }

  
    let user = await User.findOne({ email });

    if (!user) {
    
      user = new User({ email, name, isVerified: true,isEmailVerified: true,  });
    } else {
 
      if (name) {
        user.name = name;
      }
      user.isVerified = true; // Update isVerified field
      user.isEmailVerified = true; 
      // Ensure role is set to 'user'
    }

    // Save the user
    const savedUser = await user.save();
    console.log('User saved:', savedUser);
    

    // Delete the OTP entry from the database
    await User.updateOne({ otp: null }); // Assuming Otp is a model for storing OTPs

    // Generate the JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Token generated:', token);

    // Send the response with the token and user details
    res.json({
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




const getUserDetails = async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const googlelogin = async (req, res) => {
  const { idToken } = req.body;
  console.log(req.body);
  

  if (!idToken) {
    return res.status(400).send('ID Token is required');
  }

  try {
    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENTID, // Replace with your actual Google Client ID
    });

    const payload = ticket.getPayload();
    const userId = payload.sub;
    const userEmail = payload.email;
    const givenName = payload.given_name;
    const familyName = payload.family_name;

    // Create JWT token for your application
    const token = jwt.sign(
      { userId, email: userEmail, givenName, familyName },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { userId, email: userEmail, givenName, familyName } });
  } catch (error) {
    console.error('Google Login Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};








  
module.exports= {
   
    getUserDetails,
    sendEmailOtp,
    verifyEmailOtp,
    googlelogin
}