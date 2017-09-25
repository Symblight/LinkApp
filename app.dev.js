'use strict';

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const ms = require('ms');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const config = require('./web.config.json');
const passport = require('passport');
const flash = require('connect-flash');
const webpackConf = require('./webpack.config.js');

const app = express();
const compiler = webpack(webpackConf);

const port = process.env.PORT || '8080';

/* Connect to MongoDB */
let connectionsString = `mongodb://localhost:27017/dblink`;
mongoose.Promise = global.Promise;
mongoose.connect(connectionsString).
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

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
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

app.use(webpackDevMiddleware(compiler,{
	hot: true,
	publicPath: '/',
	stats:{
		colors: 	true,
        hash: 		false,
        timings: 	true,
        chunks: 	false,
        chunkModules: false,
        modules: 	false,
	}
}));
app.use(webpackHotMiddleware(compiler));

/* APP API ROUTERS */
const links = require('./server/routers/link.js');
const user = require('./server/routers/user.js');

app.use('/', links);
app.use('/user', user);


const server = http.createServer(app).listen(port, function(){
    console.log('server is up')
});

module.exports = app;