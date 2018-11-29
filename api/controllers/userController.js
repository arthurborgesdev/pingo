const userService = require('../services/userService')

exports.handleInput = function(req, res) {

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

  userService.saveInput(inputObject);
}