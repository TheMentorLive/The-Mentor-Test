// passport-setup.js
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const dotenv= require("dotenv").config()

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/api/auth/linkedin/callback',
  scope: ['r_liteprofile', 'r_emailaddress']
},
async (accessToken, refreshToken, profile, done) => {
  // Here, you can save or retrieve user information from your database
  console.log('LinkedIn profile:', profile);
  // For demonstration, we're just returning the profile
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
