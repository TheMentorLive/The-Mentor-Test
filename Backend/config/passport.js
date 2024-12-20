const passport = require('passport');
const User = require('../model/UserModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://genai-backend-ten.vercel.app/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if user already exists in our db
      const existingUser = await User.findOne({ email: profile.emails[0].value });

      if (existingUser) {
        // User exists, generate JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
          expiresIn: '1h', // Adjust token expiry as needed
        });
        // Pass token and user to the callback
        return done(null, { user: existingUser, token });
      }

      // If not, create a new user in our db
      const newUser = await new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        contact: profile.phoneNumber, 
        isVerified: true,
        isEmailVerified: true,
        otp: null,
        password:"wertyui124"
      }).save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Adjust token expiry as needed
      });

      done(null, { user: newUser, token });
    }
  )
);

// Serialize user to store user id in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
