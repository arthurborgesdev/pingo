const userController = require('../controllers/userController')

module.exports = function(app) {
	
	app.route('/')
	  .get((req, res) => 
		  res.render('index'))

	app.route('/register')
	  .get((req, res) => 
		  res.render('register', {isHuman: true}))

	  .post((req, res) => {

	  	userController.handleInput(req, res)

	  })
}
	