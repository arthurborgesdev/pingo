const recaptcha = require('../middlewares/recaptcha')
const UserModel = require('../models/userModel')
const User = require('../models/user')

exports.handleInput = function(req, res) {

	recaptcha.captchaVerify(req, res, function(error) { 
	  // Só vai acionar caso o recaptcha funcione
    if (error) {
    	res.render('register', {isHuman: false})
    } else {

      let input = {
      	name: req.body.name,
	      email: req.body.email,
	      password: req.body.password
      }

	    User.saveInput(input, function(err, data) {
	    	if(err) {
	    		res.render('register', { errorMessage: err, isHuman: true })
	    	} else {
	    		res.redirect('/');
	    	  return;
	    	}

	    	
	    });
    }
	  


	})

}