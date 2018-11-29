const mongoose = require('mongoose')
const User = require('../models/user.js') // solves the problem of the MissingSchemaError  
mongoose.model('User')
const userValidator = require('../validators/userValidator')

exports.saveInput = function(inputObject) {
  userValidator.validateInput(inputObject, function() {
  	console.log(inputObject)
  	return;
  });
}