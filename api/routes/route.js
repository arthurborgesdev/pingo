const GoogleRecaptcha = require('google-recaptcha');
const googleRecaptcha = new GoogleRecaptcha({secret: process.env.RECAPTCHA_SECRET_KEY})

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
	  			res.send("Não é humano")
	  		}

	  		res.render('register', {isHuman: true})
	  		// aqui fica a chamada pros controllers
 		    //res.redirect('/')
	  	})
		  
	  })
}
	