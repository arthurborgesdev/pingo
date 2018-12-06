var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new Strategy({
 
  email: "teste@teste.com",
  password: "123"

  },function(email, password, cb) {
  	console.log("To aqui");
    User.findOne({ email: email }, function(err, user) {

      console.log(user);

      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (bcrypt.compareSync(password, user.password)) { return cb(null, false); }
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