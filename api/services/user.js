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