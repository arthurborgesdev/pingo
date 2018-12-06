const recaptcha = require('../middlewares/recaptcha')
const UserModel = require('../models/userModel')
const User = require('../services/user')

exports.handleInput = function(req, res) {

	recaptcha.captchaVerify(req, res, function(error) { 
	  // Só vai acionar caso o recaptcha funcione
    if (error) {
    	res.render('register', {isHuman: false})
    } else {

      let input = {
      	name: req.body.name,
	      email: req.body.email,
	      password: req.body.password
      }

	    User.saveInput(input, function(err, data) {
	    	if(err) {
	    		res.render('register', { errorMessage: err, isHuman: true })
	    	} else if (data === "same") {
	    		res.render('register', { errorMessage: 'Usuário já cadastrado', isHuman: true });
	    	  return;
	    	} else {
	    		res.redirect('/');
	    	  return;
        }
	    });
    }
	  
	})

}


exports.handleLogin = function(req, res) {

	let login = {
	  email: req.body.email,
	  password: req.body.password
  }
  console.log(req.sessionStore)
  console.log(req.session)

  User.loginVerify(login, function(err, data) {
	  if(err) {
	    res.render('/', { errorMessage: err })
	  } else {
	    res.redirect('map');
	    return;
	  }

	});

}