const argon2 = require('argon2');
require('dotenv').config();
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
    argon2.hash(user.password, {
      timeCost: process.env.TIME_COST,
      memoryCost: process.env.MEMORY_COST,
      parallelism: process.env.CORES,
      type: argon2.argon2i,
    })
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch(err => next(err));
  } else return next();
  return null;
});
User.methods.comparePassword = (passw, cb) => {
  argon2.verify(this.password, passw)
    .then(match => cb(null, match))
    .catch(err => cb(err));
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
