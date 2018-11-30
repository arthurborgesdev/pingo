const mongoose = require('mongoose')
const User = require('../models/user.js') // solves the problem of the MissingSchemaError  
mongoose.model('User')
const userValidator = require('../validators/userValidator')

exports.saveInput = function(req, res) {
  userValidator.validateInput(req, res, function() {
    
    //console.log(req.joiError)

    if (req.joiError) {
    	res.render('register', { errorMessage: req.joiError, isHuman: true })
    } else {
    	// Bcrypt
      // save to DB
      res.redirect('/')
  	  return;
    }
    
  });
}
