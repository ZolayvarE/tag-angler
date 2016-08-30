var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  date: { type: Date, default: Date.now() }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;