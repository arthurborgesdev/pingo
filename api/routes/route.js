const userController = require('../controllers/userController'),
      passport = require('passport')
      const router = require('express').Router();
      const loggedIn = require('../middlewares/loggedIn').loggedIn;

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index', {isCorrect: true})
	})

	app.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if(err) {return next(err);}
      //console.log("USER AQUI");
      console.log(user);
      if (!user) { return res.render('index', {isCorrect: false })}
      req.login(user, function(err) {
        if (err) { return err; }
      	// aqui vai ser necessário se a rota pegar o uuid do user.name (:uid)
      	return res.redirect('map')
      });

    })(req, res, next)
	})

	app.get('/register', function(req, res) {
		res.render('register', {isHuman: true})
	})
		  
	app.post('/register', function(req, res) {
	  userController.handleInput(req, res)
	})

	app.get('/map', loggedIn, function(req, res) {

	  passport.authorize('local', { failureRedirect:'/' })
		res.render('map')
	})
} 
	