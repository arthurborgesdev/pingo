const userController = require('../controllers/userController'),
      passport = require('passport')
      const router = require('express').Router();

module.exports = function(app) {
	
	app.route('/')
	  .get(function(req, res) {
		  res.render('index', {isCorrect: true})
	  })
		.post(function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
      	if(err) {return next(err);}
      	//console.log("USER AQUI");
      	//console.log(user);
      	if (!user) { return res.render('index', {isCorrect: false })}
      	//req.login(user, next);
        res.redirect('/map')

      })(req, res, next)
	  })

	app.route('/register')
	  .get(function(req, res) {
		  res.render('register', {isHuman: true})
	  })
		  
	  .post(function(req, res) {
	  	userController.handleInput(req, res)
	  })
	  	

  app.route('/map')
    .get(function(req, res) {
  	  res.render('map')
    })
 
}
	