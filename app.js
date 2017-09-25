'use strict';

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const ms = require('ms');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const config = require('./web.config.json');

const app = express();

const port = process.env.PORT || '8080';
app.set('port', port);

/* Connect to MongoDB */
let connectionsString = `mongodb://symblight:pwfE3W62=@cluster0-shard-00-00-p3dfc.mongodb.net:27017,cluster0-shard-00-01-p3dfc.mongodb.net:27017,cluster0-shard-00-02-p3dfc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;
let uri = 'mongodb://******@ds123614.mlab.com:23614/dblinks'
mongoose.Promise = global.Promise;
mongoose.connect(uri).
  then(() => console.log('OK')).
  catch((err) => console.log('Error:' + err));

app.all('/*', function (req, res, next) {
	  // CORS headers
	  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
	  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	  // Set custom headers for CORS
	  res.header('Access-Control-Allow-Headers', 'Content-type,Accept');
	  if (req.method === 'OPTIONS') {
	    res.status(200).end();
	  } else {
	    next();
	  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

/* APP USE MODULE */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.cookieSecret));
app.use(session({
	resave: false,
	secret: config.cookieSecret,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		ttl: 3 * 24 * 60 * 60,
		touchAfter: 24 * 60 * 60,
		stringify: false
	}),
	cookie: {
		httpOnly: true,
		secure: true,
		maxAge: ms('3 days')
	}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/* APP API ROUTERS */
const links = require('./server/routers/link.js');
const user = require('./server/routers/user.js');

app.use('/', links);
app.use('/user', user);

var server = http.createServer(app).listen(port, function(){
	console.log('server is up on port '+ app.get('port'))
});

module.exports = app;