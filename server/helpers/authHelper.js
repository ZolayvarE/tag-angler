var bcrypt = require('bcrypt');

module.exports = {
  validToken: function () {
    return bcrypt.hashSync('valid', 10);
  },

  invalidToken: function () {
    return bcrypt.hashSync('invalid', 10);
  },

  isValid: function (string) {
    return bcrypt.compareSync('valid', string);
  }
};