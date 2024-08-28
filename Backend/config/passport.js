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
      callbackURL: 'http://localhost:8080/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
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
          isVerified: true,
          isEmailVerified: true,
          otp: null,
        }).save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: '1h', // Adjust token expiry as needed
        });

        done(null, { user: newUser, token });
      } catch (err) {
        console.error('Error in Google Strategy:', err);
        done(err, null);
      }
    }
  )
);

// Serialize user to store user id and token in session
passport.serializeUser((userObj, done) => {
  // Pass user object directly
  done(null, userObj);
});

// Deserialize user from session
passport.deserializeUser(async (userObj, done) => {
  try {
    const user = await User.findById(userObj.user._id);
    done(null, { user, token: userObj.token });
  } catch (err) {
    console.error('Error in deserializing user:', err);
    done(err, null);
  }
});
