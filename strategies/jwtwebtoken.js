const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt 
const mongoose = require('mongoose')

// import schema to use with jwt
const User = mongoose.model('users')
// import DB secret key
const secretkey = require('../config/myDbUrl')


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secretkey.secretOrKey


module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(person => {
        if (person) {
          return done(null, person)
        }
        return (null, false)
      })
      .catch(err => console.log(err))
  }))
}