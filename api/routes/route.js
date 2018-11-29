const userController = require('../controllers/userController')
const recaptcha = require('../middlewares/recaptcha')

module.exports = function(app) {
	
	app.route('/')
	  .get((req, res) => 
		  res.render('index'))

	app.route('/register')
	  .get((req, res) => 
		  res.render('register'))

	  .post((req, res) => {

	  	recaptcha.captchaVerify(req, res, function() { 
	  		// Só vai acionar caso o recaptcha funcione
	  		userController.handleInput(registerData)
	  	})
      
	  })
}
	