const userController = require('../controllers/userController'),
      passport = require('passport')

module.exports = function(app) {
	
	app.route('/')
	  .get((req, res) => 
		  res.render('index'))

	  .post((req, res) => {
        console.log("Antes do authenticate")
	  	  passport.authenticate('local', {failureRedirect:'/'}), (err, user, info) => {
	  	  	console.log("Dentro do callback do authenticate")
	  	    res.redirect('/map')
	  	  }
        console.log("Depois do authenticate")
	    })

	  	//userController.handleLogin(req, res))

	app.route('/register')
	  .get((req, res) => 
		  res.render('register', {isHuman: true}))

	  .post((req, res) => 
	  	userController.handleInput(req, res))

  app.route('/map')
    .get((req, res) =>
    	res.render('map'))
}
	