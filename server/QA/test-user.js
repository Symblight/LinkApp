'use strict';

process.env.ENV= "test";

const server = require('../app.dev.js');
const User = require('../models/user.js');
const chai = require('chai');
const chaiHtpp = require('chai-http');
const mongoose = require("mongoose");

const should = chai.should();

chai.use(chaiHtpp);

describe('/USER tests', function(){
	beforeEach(function(done){
		User.remove({}, function(err){
			done();
		})
	});

/* /POST TEST request SIGN UP USER */
	describe('sign up', function(){
		it('SIGN UP USER', function(done){
			let user = {
				username: 'admin',
				firstname: 'Alexey',
				lastname: 'Tkachenko',
				email: 'symblight@gmail.com',
				password: 'qwerty'
			}

			chai.request(server)
				.post('/user/signup')
				.send(user)
				.end(function(err, res){
					res.status.should.equal(200);
					done();
				})
		})
	});

	describe('sign up wrong username', function(){
		it('USERNAME used', function(done){
			let user = new User({
				username: 'admin',
				firstname: 'Alexey',
				lastname: 'Tkachenko',
				email: 'symblight@gmail.com',
				password: 'qwerty'
			})

			user.save(function(err, res){
				let user_2 = {
					username: 'admin',
					firstname: 'Alexey',
					lastname: 'Tkachenko',
					email: 'qwerty@gmail.com',
					password: 'qwerty'
				}

				chai.request(server)
					.post('/user/signup')
					.send(user_2)
					.end(function(err, res){
						res.status.should.equal(409);
						done();
					})
				})
		})
	});

	describe('sign up wrong email', function(){
		it('EMAIL used', function(done){
			let user = new User({
				username: 'admin',
				firstname: 'Alexey',
				lastname: 'Tkachenko',
				email: 'symblight@gmail.com',
				password: 'qwerty'
			})

			user.save(function(err, res){
				let user_2 = {
					username: 'JerryMonster',
					firstname: 'Alexey',
					lastname: 'Tkachenko',
					email: 'symblight@gmail.com',
					password: 'qwerty'
				}

				chai.request(server)
					.post('/user/signup')
					.send(user_2)
					.end(function(err, res){
						res.status.should.equal(409);
						done();
					})
				})
		})
	});

	/*POST TESTS request SIGN IN*/
	describe('sign in', function(){
		it('SIGN IN USER', function(done){

			let user = new User({
				username: 'admin',
				firstname: 'Alexey',
				lastname: 'Tkachenko',
				email: 'symblight@gmail.com',
				password:''
			})

			user.password = user.encryptPassword('qwerty');

			user.save(function(err, _user){
				let user_signin = {
					email: 'symblight@gmail.com',
					password: 'qwerty'
				}

				chai.request(server)
					.post('/user/login')
					.send(user_signin)
					.end(function(err, res){
						res.status.should.equal(200);
						done();
					})
			})
			
		})
	});

	describe('sign in', function(){
		it('SIGN IN USER NULL', function(done){

			let user = new User({
				username: 'admin',
				firstname: 'Alexey',
				lastname: 'Tkachenko',
				email: 'symblight@gmail.com',
				password:''
			})

			user.password = user.encryptPassword('qwerty');

			user.save(function(err, _user){
				let user_signin = {
					email: '',
					password: ''
				}

				chai.request(server)
					.post('/user/login')
					.send(user_signin)
					.end(function(err, res){
						res.status.should.equal(400);
						done();
					})
			})
			
		})
	});

	describe('sign in', function(){
		it('wrong email', function(done){

			let user = new User({
				username: 'admin',
				firstname: 'Alexey',
				lastname: 'Tkachenko',
				email: 'symblight@gmail.com',
				password:''
			})

			user.password = user.encryptPassword('qwerty');

			user.save(function(err, _user){
				let user_signin = {
					email: 'symb@gmail.com',
					password: 'qwerty'
				}

				chai.request(server)
					.post('/user/login')
					.send(user_signin)
					.end(function(err, res){
						res.status.should.equal(409);
						done();
					})
			})
			
		})
	});

	describe('sign in', function(){
		it('wrong password', function(done){

			let user = new User({
				username: 'admin',
				firstname: 'Alexey',
				lastname: 'Tkachenko',
				email: 'symblight@gmail.com',
				password:''
			})

			user.password = user.encryptPassword('qwerty');

			user.save(function(err, _user){
				let user_signin = {
					email: 'symblight@gmail.com',
					password: 'qwerty1'
				}

				chai.request(server)
					.post('/user/login')
					.send(user_signin)
					.end(function(err, res){
						res.status.should.equal(409);
						done();
					})
			})
			
		})
	});
	/* PROFILE request user */
	describe('PROFILE', function(){
		it('it should return profile about user', function(done){

			let user = new User({
				username: 'admin',
				firstname: 'Alexey',
				lastname: 'Tkachenko',
				email: 'symblight@gmail.com',
				password:''
			})

			user.password = user.encryptPassword('qwerty');

			user.save(function(err, _user){
				let user_token = {
					token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1OWExNGEyMjA1YzJiZDNhOWVmYTEzMjEiLCJpYXQiOjE1MDM3NDI0OTh9.HkYj3Hzf4KwWsevO2O770h0x12FBllrj5x2AuWfhvvM',
				}

				chai.request(server)
					.post('/user/profile')
					.send(user_token)
					.end(function(err, res){
						res.status.should.equal(200);
						done();
					})
			})
			
		})
	});


});