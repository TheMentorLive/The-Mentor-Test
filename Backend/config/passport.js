// passport-setup.js
const passport = require('passport');
const User = require('../model/UserModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const dotenv= require("dotenv").config()

// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// Configure Passport to use Google OAuth
passport.use(   
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,     
      callbackURL:'http://localhost:8080/api/auth/google/callback'
    },
    
    async (accessToken, refreshToken, profile, done) => {
      // Check if user already exists in our db
      const existingUser = await User.findOne({ email: profile.email });
      if (existingUser) {
        // Already have record with this ID
        return done(null, existingUser);
       
      }
      console.log("passwpoohjhh" ,existingUser,profile.displayName)

      // If not, create a new user in our db
      const newUser = await new User({
        // googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      }).save();
      done(null, newUser);
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


