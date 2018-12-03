// Mongoose requiring and schema definition
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const userValidator = require('../validators/userValidator')
const bcrypt = require('bcrypt')
const saltRounds = 10

// Schema declaration
var UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.statics.saveInput = function(input, cb) {

	userValidator.validateInput(input, function(err) {
		
		if(err) {
			var joiError = err.details[0].message;
			return cb(joiError);
		}

		bcrypt.hash(input.password, saltRounds, function(err, hash) {

      console.log(input.name, input.email, input.password, hash)

      // save to DB
      return cb();
    })

  })    

}


// Schema compiling and exportation
module.exports = mongoose.model('User', UserSchema);