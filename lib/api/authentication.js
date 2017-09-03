const express = require('express');
require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Validator = require('../validateInput');

require('../../config/authconfig');

const router = express.Router();

const isEmpty = (obj) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const i in obj) {
    if (obj[i] !== '') return false;
  }
  return true;
};

// POST to /register
router.post('/register', (req, res) => {
  // server-side validation
  const errors = {
    firstName: Validator.validatefirstName(req.body.firstName),
    lastName: Validator.validatelastName(req.body.lastName),
    username: Validator.validateusername(req.body.username),
    email: Validator.validateemail(req.body.email),
    password: Validator.validatepassword(req.body.password),
  };
  if (!isEmpty(errors)) return res.send(JSON.stringify({ error: errors }));

  const newUser = new User(req.body);
  // Save the user via Passport's "register" method
  User.register(newUser, req.body.password, (err, user) => {
    // If there's a problem, send back a JSON object with the error
    if (err) {
      if (err.name === 'UserExistsError') {
        return res.send(JSON.stringify({
          error: {
            firstName: '',
            lastName: '',
            username: 'This username is taken.',
            email: '',
            password: '',
          },
        }));
      }
    }
    // Otherwise, for now, send back a JSON object with the new user's info
    return res.send(JSON.stringify(user));
  });
  return null;
});

// POST to /login
router.post('/login', (req, res) => {
  // server-side validation
  const errors = {
    username: Validator.validateusername(req.body.username),
    password: Validator.validatepassword(req.body.password),
  };
  if (!isEmpty(errors)) return res.send(JSON.stringify({ error: errors }));

  passport.authenticate('local')(req, res, () => {
    // If logged in, we should have user info to send back
    if (req.user) {
      const userdata = JSON.stringify(req.user);
      const token = jwt.sign({
        username: req.user.username,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        img: req.user.img,
      }, process.env.JWT_SECRET);
      res.cookie('token', token);
      return res.send(userdata);
    }
    // Otherwise return an error
    return res.send(JSON.stringify({ error: 'There was an error logging in' }));
  });
  return null;
});

// GET to /validate
router.get('/validate', (req, res) => {
  const receivedtoken = req.cookies.token;
  jwt.verify(receivedtoken, process.env.JWT_SECRET, (error) => {
    if (error) {
      req.session.destroy();
      res.clearCookie('connect.sid');
      res.clearCookie('token');
      return res.status(500).send('invalid token');
      // eslint-disable-next-line no-else-return
    } else return res.send('token validated');
  });
});

// GET to /logout
router.get('/logout', (req, res) => {
  // req.session.destroy(function() {
  //   delete req.session.user;
  // });
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.clearCookie('token');
  req.logout();
  return res.send(JSON.stringify(req.user));
});

// Facebook
router.get('/auth/facebook', passport.authenticate(
  'facebook',
  {
    scope: [
      'public_profile',
      'email',
      'user_birthday',
    ],
  }),
);
// router.get('/facebook/callback',
//   passport.authenticate('facebook',
//   (req, res, () => { return res.send('authenticated') })
// );

router.get('/facebook/callback', (req, res) => {
  passport.authenticate('facebook')(req, res, () => res.send('authenticated by facebook?'));
  return null;
});














module.exports = router;
