require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Local strategy
// -----------------------------------------------------------------------------
passport.use(new LocalStrategy(User.authenticate()));

/* eslint-disable */
// Facebook strategy
// -----------------------------------------------------------------------------
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://54.197.22.181/api/authentication/facebook/callback',
  profileFields: [
    'id',
    'first_name',
    'last_name',
    'gender',
    'email',
    'birthday',
    'picture.type(large)',
  ],
},
function (accessToken, refreshToken, profile, done) {
  console.log(accessToken, profile);
  // process.nextTick(function(){
  //   User.findOne({'facebook.id': profile.id}, function(err, user){
  //     if(err) return done(err);
  //     if(user) return done(null, user);
  //     else {
  //       let newUser = new User();
  //       console.log(profile);
  //       newUser.facebook.id = profile.id;
  //       newUser.facebook.token = accessToken;
  //       newUser.facebook.email = profile.emails[0].value;
  //       newUser.facebook.name = profile.name.givenName + profile.name.familyName;
  //       newUser.save(function(err){
  //         if(err) throw err;
  //         return done(null, newUser);
  //       });
  //     }
  //   });
  // });
}));
