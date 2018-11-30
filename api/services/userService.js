const mongoose = require('mongoose')
const User = require('../models/user.js') // solves the problem of the MissingSchemaError  
mongoose.model('User')
const userValidator = require('../validators/userValidator')

exports.saveInput = function(req, res) {
  userValidator.validateInput(req, res, function() {
    // save to DB
    console.log(req.joi.error)
    res.render('index')
  	return;
  });
}