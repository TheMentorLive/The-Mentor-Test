const User = require("../model/UserModel");
const FormData= require("../model/FormData")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const passport = require('passport');
const express = require('express');
const session = require('express-session');
dotenv.config();
const app = express();
const { generateOtp, sendOtpEmail } = require('../utils/otp');
const client = new OAuth2Client(process.env.CLIENTID);

require('../config/passport');
require('../config/passport-linkedin');








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


      // If user does not exist, create a new user with the OTP
      user = new User({ email, otp, isEmailVerified: false, });
      console.log(`Creating new user: ${email}`, user);
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

      user = new User({ email, name, isVerified: true, isEmailVerified: true, });
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


// Google Login
const googlelogin = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};


// Google Callback
const googleCallback = (req, res) => {
  passport.authenticate('google', (err, userObj) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).json({ error: 'Authentication failed' });
    }
    if (!userObj) {
      return res.status(400).json({ error: 'User not found' });
    }

    const { user, token } = userObj;  // Destructure user and token from the returned object

    req.logIn(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Login failed' });
      }

      // Construct the redirect URL with the token and user ID
      const redirectUrl = `https://www.genailearning.in/auth/callback?token=${token}&id=${user._id}&role=${user.role}`;

      // Redirect to the frontend application with the token in the query parameters
      res.redirect(redirectUrl);
    });
  })(req, res);
};


// linked in

const linkedinAuth = passport.authenticate("linkedin", { scope: ["r_emailaddress", "r_liteprofile"] });

// LinkedIn OAuth Callback
const linkedinCallback = (req, res, next) => {
  passport.authenticate("linkedin", (err, user) => {
    if (err || !user) {
      res.redirect("/");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .cookie("token", token, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
      .redirect("/");
  })(req, res, next);
};





const registerUser = async (req, res) => {
  const { name, email, password } = req.body;


  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user && !user.isVerified) {
      // User exists but is not verified, so update their information

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user's name, hashed password, and generate a new OTP
      user.name = name;
      user.password = hashedPassword;

      // Generate a new 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;

      // Save the updated user details to the database
      await user.save();

      // Resend OTP email
      await sendOtpEmail(email, otp);

      return res.status(200).json({
        success: true,
        message: 'User information updated, new OTP sent to your email. Please verify your account.'
      });
    }

    // If user exists and is already verified
    if (user && user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'User already exists and is verified.'
      });
    }

    // If no existing user, create a new user with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

    // Create a new user instance
    user = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,  // User is not verified yet
    });

    // Save the new user to the database
    await user.save();

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Assign the OTP to the user and save it
    user.otp = otp;
    await user.save();  // Save the OTP to the user's record

    // Send OTP email
    await sendOtpEmail(email, otp);

    // Return success message
    res.status(201).json({
      success: true,
      message: 'User registered, OTP sent to your email. Please verify your account.',
    });

  } catch (error) {
    // Catch any server error
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Check if OTP matches
    if (user.otp === otp) {
      // Mark user as verified
      user.isVerified = true;
      user.isEmailVerified = true;
      user.otp = null;  // Clear the OTP after successful verification

      // Save the user's updated status
      await user.save();

      return res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error during OTP verification:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

const completeProfile = async (req, res) => {

  const { email, name, contact, qualification, interest } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user's profile details
    user.name = name || user.name;
    user.contact = contact || user.contact;
    user.qualification = qualification || user.qualification;
    user.interest = interest || user.interest;

    // Save the updated profile information
    await user.save();

    // Log user object to debug


    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Adjust token expiration as needed
    );

    // Respond with success and include token and user data
    res.status(200).json({
      success: true,
      message: 'Profile completed successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        qualification: user.qualification,
        interest: user.interest,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error during profile completion:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No account found with these credentials.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'User is not verified. Please check your email to verify your account.',
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};










const restpassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Random 6-digit OTP

    // Save OTP to user's account
    user.otp = otp.toString(); // Store OTP as a string
    await user.save();

    // Send OTP via email
    await sendOtpEmail(email, otp);

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};




const verifyResetOtp = async (req, res) => {
  const { otp, email } = req.body;

  try {
    // Find user in the database using the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Check if the OTP matches the one stored in the user's record
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP matches, set the user's OTP field to null
    user.otp = null;
    await user.save();

    res.json({ success: true, message: 'OTP verified and cleared' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};


const setPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password and clear OTP (if using OTP reset flow)
    user.password = hashedPassword;
    user.otp = null; // Optional: Clear OTP after password reset if you used OTP for reset
    await user.save();

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};


const Form = async (req, res) => {
  console.log(req.body);

  const { name, email, phone } = req.body;

  try {
    // Check if form data with the same email and phone already exists in your local database
    const existingFormData = await FormData.findOne({ email, phone });

    if (existingFormData) {
      // Update only the fields that have changed
      existingFormData.name = name || existingFormData.name;
      
      // Save the updated document in your database
      await existingFormData.save();

      // Respond with a message indicating the data was updated
      res.status(200).json({ message: 'Form data updated successfully' });

      // Skip sending to HubSpot if data already exists in the database
      return;
    } else {
      // Create a new document
      const newFormData = new FormData({
        name,
        email,
        phone,
      });

      // Save the new document to the database
      await newFormData.save();

      // Respond with a message indicating the data was saved
      res.status(201).json({ message: 'Form data saved successfully' });
    }

    // Send the data to HubSpot if the document was newly created
    const hubspotApiKey = process.env.HUBSPOT_API; // Your HubSpot API key

    // Adjusting the payload structure to exclude non-existent properties
    const hubspotData = {
      properties: {
        firstname: name,
        email: email,
        phone: phone,
      },
    };

    // Sending the contact data to HubSpot
    const hubspotResponse = await axios.post(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      hubspotData,
      {
        headers: {
          Authorization: `Bearer ${hubspotApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('HubSpot response:', hubspotResponse.data);
  } catch (error) {
    console.error('Error saving form data or sending to HubSpot:', error);
    res.status(500).json({ error: 'Failed to save or update form data' });
  }
};







module.exports = {

  getUserDetails,
  sendEmailOtp,
  verifyEmailOtp,
  googlelogin,
  googleCallback,
  linkedinAuth,
  linkedinCallback,
  registerUser,
  verifyOtp,
  completeProfile,
  loginUser,

  restpassword,
  verifyResetOtp,
  setPassword,
  Form

}