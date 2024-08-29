const User = require("../model/UserModel");
const bcrypt = require('bcryptjs');
const jwt= require("jsonwebtoken")
const dotenv= require("dotenv")
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
      const redirectUrl = `http://localhost:5173/auth/callback?token=${token}&id=${user._id}&role=${user.role}`;

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
      .cookie("token", token,{httpOnly:true,sameSite:"None",secure:true,maxAge:24*60*60*1000})
      .redirect("/");
  })(req, res, next);
};





  
module.exports= {
   
    getUserDetails,
    sendEmailOtp,
    verifyEmailOtp,
    googlelogin,
    googleCallback,
    linkedinAuth,
    linkedinCallback
}