const GoogleRecaptcha = require('google-recaptcha');
const googleRecaptcha = new GoogleRecaptcha({secret: process.env.RECAPTCHA_SECRET_KEY})

exports.captchaVerify = function(req, res, next) {

	const recaptchaResponse = req.body['g-recaptcha-response']

	googleRecaptcha.verify({response: recaptchaResponse}, (error) => {
	  if (error) {
	  	res.render('register', {isHuman: false})
	  } else {
	  	next()
	  }
	})
}
	