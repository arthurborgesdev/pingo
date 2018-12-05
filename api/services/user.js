// Mongoose requiring
var mongoose = require('mongoose');
const User = mongoose.model('User')
const userValidator = require('../validators/userValidator')
const bcrypt = require('bcrypt')
const saltRounds = 10
var Promise = require('promise');
const moment = require('moment-timezone');


// business logic
exports.saveInput = function(input, cb) {

  // check if the email inserted is already registered
	User.findOne({ email: input.email }, function(err, user) {
    
    if (err) { return cb(err); }
    else if (user) { return cb(null, "same"); }
    else {

      userValidator.validateInput(input, function(err) {

		    if(err) {
					var joiError = err.details[0].message;
					return cb(joiError);
				}
    
		    bcrypt.hash(input.password, saltRounds)
		    .then(function (hash) {

			    console.log(input.name, input.email, input.password, hash)

			    // save to DB
			    let user = new User({
			    	name: input.name.toString(),
			    	email: input.email.toString(),
			    	password: hash,
			    	createdOn: moment().tz('America/Sao_Paulo').format()
			    })

			    console.log(moment().tz('America/Sao_Paulo').format())

			    user.save()
			    .then(function(user) {
			    	return cb();
			    })
		      .catch(function(err){
		      	console.log(err);
		      	return cb();
		      })
			    
			  })

	    })

    }
    
  })

}

exports.loginVerify = function(login, cb) {
  
  let email = login.email;
  let password = login.password;
  
  console.log(email);
  console.log(password);

  passport.use(new Strategy(
  function(email, password, cb) {
  	console.log("To aqui");
    User.findOne({ email: email } , function(err, user) {

      console.log(user);

      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (bcrypt.compareSync(myPlaintextPassword, hash)) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user.email);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  passport.authenticate('local', { failureRedirect: '/' }), function() {
    cb();
  };

}