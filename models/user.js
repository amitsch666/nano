const { mongoose } = require('../config/dbconfig');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: {
		type: String,
		lowercase: true,
		required: true,
	},
  password: {
		type: String,
		select: false,
		required: true,
	},
  firstName: {
		type: String,
		required: true,
	},
  lastName: {
		type: String,
		required: true,
	},
  email: {
		type: String,
		lowercase: true,
		required: true,
	},
  img: {
		type: String,
	},
}, { timestamps: true });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
