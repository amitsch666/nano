// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy;
//
// const User = require('../models/user');
//
// passport.serializeUser(function(user, done) {
// 	done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
// 	User.findById(id, function(err, user) {
// 		done(err, user);
// 	});
// });
//
// passport.use('local.signup', new LocalStrategy({
// 	usernameField: 'username',
// 	passwordField: 'password',
// 	passReqToCallback: true,
// }, function(req, username, password, done){
// 	User.findOne({
// 		'username': username,
// 	}, function(err, user){
// 		if(err) {
// 			return done(err);
// 		}
// 		if(user) {
// 			return done(null, false);
// 		}
// 		const newUser = new User();
// 		newUser.firstName = req.body.firstName;
// 		newUser.lastName = req.body.lastName;
// 		newUser.email = req.body.email;
// 		newUser.img = req.body.img;
// 		newUser.password = newUser.encryptPassword(req.body.password);
//
// 		newUser.save(function(err) {
// 			if(err) {
// 				return done(err);
// 			}
// 			return done(null, newUser);
// 		});
// 	});
// }));
//
// // passport.use(new LocalStrategy(
// //   function(username, password, done) {
// //     User.findOne({ username: username }, function (err, user) {
// //       if (err) { return done(err); }
// //       if (!user) {
// //         return done(null, false, { message: 'Incorrect username.' });
// //       }
// //       if (!user.validPassword(password)) {
// //         return done(null, false, { message: 'Incorrect password.' });
// //       }
// //       return done(null, user);
// //     });
// //   }
// // ));
