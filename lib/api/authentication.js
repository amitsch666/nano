const express = require('express');
require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../../models/user.js');

const router = express.Router();

// POST to /register
router.post('/register', (req, res) => {
  const newUser = new User(req.body);
  // Save the user via Passport's "register" method
  User.register(newUser, req.body.password, (err, user) => {
    // If there's a problem, send back a JSON object with the error
    if (err) {
      return res.send(JSON.stringify({ error: err }));
    }
    // Otherwise, for now, send back a JSON object with the new user's info
    return res.send(JSON.stringify(user));
  });
});

// POST to /login
router.post('/login', (req, res) => {
  passport.authenticate('local')(req, res, () => {
    // If logged in, we should have user info to send back
    if (req.user) {
      const userdata = JSON.stringify(req.user);
			let token = jwt.sign({
				// _id: req.user._id,
				// __v: req.user.__v,
				// salt: req.user.salt,
				// hash: req.user.hash,
				// updatedAt: req.user.updatedAt,
				// createdAt: req.user.createdAt,
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
});

// GET to /validate
router.get('/validate', (req, res) => {
	const receivedtoken = req.cookies.token;
	jwt.verify(receivedtoken, process.env.JWT_SECRET, function(error, decode){
		if(error){
			req.session.destroy(function() {
				delete req.session.user;
			});
			res.clearCookie('connect.sid');
			res.clearCookie('token');
			return res.status(500).send('invalid token');
		} else {
			return res.send('token validated');
		}
	});
});

// GET to /logout
router.get('/logout', (req, res) => {
	req.session.destroy(function() {
		delete req.session.user;
	});
	res.clearCookie('connect.sid');
	res.clearCookie('token');
  req.logout();
  return res.send(JSON.stringify(req.user));
});

module.exports = router;
