const userService = require('../services/userService')
const recaptcha = require('../middlewares/recaptcha')

exports.handleInput = function(req, res) {

	recaptcha.captchaVerify(req, res, function() { 
	  // Só vai acionar caso o recaptcha funcione

    req.name = req.body.name
    req.email = req.body.email
    req.password = req.body.password

    userService.saveInput(req, res);


	})
  
  /*
  const registerData = {
	  name: req.body.name,
	  email: req.body.email,
	  password: req.body.password
	}
  
  if (inputResults) {
 		    res.render('register', { errorMessage: inputResults })
 		  } else {
 		    res.redirect('/')
 		  }
  */
  
}