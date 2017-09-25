'use strict';

process.env.ENV= "test";

const server = require('../app.dev.js');
const Link = require('../models/link.js');
const chai = require('chai');
const chaiHtpp = require('chai-http');
const mongoose = require("mongoose");

const should = chai.should();

chai.use(chaiHtpp);

describe('/Link tests', function(){
	beforeEach(function(done){
		Link.remove({}, function(err){
			done();
		})
	});

	/* /POST request TEST short link */

	describe('short link', function(){
		it('/POST should return short link', function(done){
			let link = {
				long_url: "https://vk.com/doc123534285_443714585?hash=6f26b25de6cf644ef2&dl=2c22b56cab01014bf5"
			}

			chai.request(server)
				.post('/short')
				.send(link)
				.end(function(err, res){
					res.status.should.equal(200);
					res.body.should.have.property('short_url');
					done();
				});
		});
	 });

	/* /GET request TEST get link */

	describe('get link', function(){
		it('/GET should return link', function(done){

			let link = new Link({
				short_url: 'qwerty',
				long_url: "https://vk.com/doc123534285_443714585?hash=6f26b25de6cf644ef2&dl=2c22b56cab01014bf5",
				createAt: new Date(),
				visible: true,
				details:{
					clicks: 0
				}
			})

			link.save(function(err, _link){
				chai.request(server)
				.get('/'+_link.short_url)
				.end(function(err, res){
					res.status.should.equal(200);
					done();
				});
			});
		})
	});

	/* /POST request TEST get array link by author */

	


});