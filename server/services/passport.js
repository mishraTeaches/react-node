const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')
const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (token, refreshtoken, profile, done) => {
      const existinguser = await User.findOne({ googleId: profile.id })
      if (existinguser) {
        done(null, existinguser)
      } else {
        const user = await new User({ googleId: profile.id }).save()
        done(null, user)
      }
    }
  )
)
