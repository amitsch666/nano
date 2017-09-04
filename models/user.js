const bcrypt = require('bcrypt');
const { mongoose } = require('../config/dbconfig');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: true,
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
    unique: true,
  },
  img: {
    type: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
}, { timestamps: true });

// eslint-disable-next-line prefer-arrow-callback
User.pre('save', function cb(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);
        user.password = hash;
        next();
        return null;
      });
      return null;
    });
  } else return next();
  return null;
});
User.methods.comparePassword = (passw, cb) => {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
