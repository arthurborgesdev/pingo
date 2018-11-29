const GoogleRecaptcha = require('google-recaptcha');
const googleRecaptcha = new GoogleRecaptcha({secret: process.env.RECAPTCHA_SECRET_KEY})
var userController = require('../controllers/userController')

module.exports = function(app) {
	
	app.route('/')
	  .get((req, res) => 
		  res.render('index'))

	app.route('/register')
	  .get((req, res) => 
		  res.render('register'))

	  .post((req, res) => {
	  	const recaptchaResponse = req.body['g-recaptcha-response']

	  	googleRecaptcha.verify({response: recaptchaResponse}, (error) => {
	  		if (error) {
	  			//res.render('register', {isHuman: false})
	  			console.log(error)
	  		}

	  		const registerData = {
	        name: req.body.name,
	        email: req.body.email,
	        password: req.body.password
	  		}

	  	  userController.handleInput(registerData)
 		    res.redirect('/')
	  	})
		  
	  })
}
	