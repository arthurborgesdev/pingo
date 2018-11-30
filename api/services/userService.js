const mongoose = require('mongoose')
const User = require('../models/user.js') // solves the problem of the MissingSchemaError  
mongoose.model('User')
const userValidator = require('../validators/userValidator')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.saveInput = function(req, res) {
  
  userValidator.validateInput(req, res, function() {
    
    bcrypt.hash(req.password, saltRounds, function(err, hash) {

      console.log(req.name, req.email,req.password, hash)

      // save to DB
      res.redirect('/')
      return;
    })    
  })
}
