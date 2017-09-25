'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../../web.config.json');
const User = require('../../models/user.js');
const passport = require('passport')
	,LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
	passport.serializeUser(function(user, done) {
	  	done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  	User.findById(id, function(err, user) {
	    	done(err, user);
	  	});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
	    passwordField: 'password',
	    passReqToCallback: true
	}, function(req, username, password, done){
		let valid = true;
		User.findOne({'email': req.body.email}, function(err,user){
			if (err){return done(err);}
        	if (user){
                const error = new Error('email is already used');
                error.name ='IncorrectCreditalsError';
                error.email = 'email is already used';
                valid = false;
            	return done(error);
        	}
		

			User.findOne({'username': username}, function(err, user){
				if (err){return done(err);}
	        	if (user){
	                const error = new Error('username is already used');
	                error.name ='IncorrectCreditalsError';
	                error.username = 'username is already used';
	                valid = false;
	            	return done(error);
	        	}
	        	var newUser = new User();
		        newUser.firstname 	= req.body.firstname;
		        newUser.lastname 	= req.body.lastname;
		        newUser.username 	= username;
		        newUser.password 	= newUser.encryptPassword(password);
		        newUser.email 		= req.body.email;

		        if(valid)
			        newUser.save(function(err,res){
			        	if (err){return done(err);}
			        	const payload = {
		                	sub: res._id
		            	}
		            	const token = jwt.sign(payload, config.jwtSecret);
		            	return done(null, token, newUser);
			        });
			});
		});

	}));
}