exports.loggedIn = function (req, res, next) {
  if (req.user) {
	  next();
  } else {
  	  console.log(req.user)
	  res.redirect('/');
  }
}

