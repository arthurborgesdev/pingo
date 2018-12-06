require('dotenv').config()
const express = require('express'),
      app = express(),
      redis = require('redis'),
      session = require('express-session'),
      redisStore = require('connect-redis')(session),
      client = redis.createClient(),
      port = process.env.PORT,
      path = require('path'),
      bodyParser = require('body-parser'),
      routes = require('./api/routes/route')
      mongoose = require('mongoose'),
      passport = require('passport'),
      Strategy = require('passport-local').Strategy;

// substitui pelo link do mLAB no heroku em produção
if (process.env.NODE_ENV === "development") {
	mongoose.connect('mongodb://localhost/pingo', { useNewUrlParser: true })
} else if (process.env.NODE_ENV === "production") {
	mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }) 
}

app.use(session({
	secret: 'ssshhhhh',
	store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
	saveUninitialized: true,
	resave: true,
	cookie: { maxAge: 24*60*60*1000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', './views')
app.set('view engine', 'pug')

require('./api/middlewares/passport');

routes(app);

app.listen(port, () =>
	console.log(`Server started on port ${port}`));