var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, unique: true, required: true, dropDups: true },
  password: { type: String, required: true }, 
  date: { type: Date, default: Date.now() }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;