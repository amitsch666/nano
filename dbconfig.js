require('dotenv').config();
const bluebird = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGO_PATH, {
  useMongoClient: true,
  promiseLibrary: bluebird
});
module.exports = { mongoose }
