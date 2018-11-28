module.exports = function(app) {
	
	app.route('/')
	  .get((req, res) => 
		  res.render('index'))

	app.route('/register')
	  .get((req, res) => 
		  res.render('register'))

	  .post((req, res) => {
		  console.log(req.body)
		  // aqui fica a chamada pros controllers
		  res.redirect('/')
	  })
}
	