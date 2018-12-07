var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
const bcrypt = require('bcrypt')
const saltRounds = 10

passport.use('local', new Strategy({
 
  usernameField: 'email'

  },function(email, password, cb) {
  	console.log("To aqui");
    User.findOne({ email: email }, function(err, user) {

      //console.log(user);
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      //console.log("password: ");
      //console.log(password);
      //console.log("hash: ");
      //console.log(user.password)
      if (!bcrypt.compareSync(password.toString(), user.password)) { return cb(null, false); }
      return cb(null, user);
    });
  }
));


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});