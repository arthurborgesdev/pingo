require('dotenv').config()
const express = require('express'),
      app = express(),
      port = process.env.PORT,
      path = require('path')
      bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => 
	res.render('index'))

app.get('/register', (req, res) => 
	res.render('register'))

app.post('/register', (req, res) => {
	console.log(req.body)
	// aqui fica a chamada pros controllers
	res.redirect('/')
})
 

app.listen(port, () =>
	console.log(`Server started on port ${port}`));