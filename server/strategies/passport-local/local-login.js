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

	passport.use('local-signin',new LocalStrategy({
		usernameField: 'email',
	    passwordField: 'password',
	    passReqToCallback: true
	},function(req, email, password, done){
		User.findOne({'email': email}, function(err, user){
			if (err){return done(err);}
        	if (!user){
                const error = new Error('wrong email');
                error.name ='IncorrectCreditalsError';
            	return done(error);
        	} else
        	if (!user.validPassword(password)){
	            const error = new Error('Incorrect password')
	            error.name = 'IncorrectCreditalsError';
	            return done(error);
        	}

        	const payload = {
            	sub: user._id
        	};
	        const token = jwt.sign(payload, config.jwtSecret);
	        return done(null, token, user)
		});
	}));	


}