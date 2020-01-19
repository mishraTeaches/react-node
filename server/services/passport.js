const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then(user=>{
    done(null,user);
  })
})

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
      },
      (token,refreshtoken,profile,done) => {
        User.findOne({googleId:profile.id})
        .then((existinguser)=>{
          if(existinguser){
      done(null,existinguser);
          }
          else{
            new User({googleId:profile.id}).save().then(user=>done(null,user));
          }
        })
      }
    )
  );