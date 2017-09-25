'use strict';

var express = require('express');
var router = express.Router();
var dbLink = require('../dbUtils/Link.js');

/* POST request short link */
router.post('/short', function(req, res, next){
	dbLink.createShortLink(req.body)
		.then((data)=>{

			/* GUEST MODE */
			let arraysCookies = [];
			if (req.cookies.anon_short!=undefined){
				arraysCookies = req.cookies.anon_short;
				arraysCookies.push(data.short_url);
			} else {
				arraysCookies.push(data.short_url);
			}

			var expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 1);

            res.cookie('anon_short', arraysCookies, {
               expires: expiryDate,
               httpOnly: true
            });
            /* END GUEST MODE */

			res.set('Content-Type', 'application/json')
			.status(200)
			.json(data);
		})
		.catch((err)=>{ res.status(400).send(err); })
});

/* GET request url */
router.get('/:id_shorten', function(req, res, next){
	var short = req.params.id_shorten;
	dbLink.getLink(short)
		.then((data)=>{ 
			res.set('Content-Type', 'application/json')
			.status(200)
			.redirect(data.long_url);
		})
		
		.catch((err)=>{ res.status(400).send(err); })
});

/* POST request get array links by author */
router.post('/list', function(req, res, next){
	dbLink.getList(req.body)
		.then((data)=>{ 
			res.set('Content-Type', 'application/json')
			.status(200)
			.json(data);
		})
		.catch((err)=>{ res.status(400).send(err); })
});

/* /POST request get anon array cookie links by guest  */
router.get('/list/data', function(req, res, next){

	let arraysCookies = [];
	if(req.cookies.anon_short!=undefined)
		arraysCookies=req.cookies.anon_short;

	dbLink.getListGuest(arraysCookies)
		.then((data)=>{ 
			res.set('Content-Type', 'application/json')
			.status(200)
			.json(data);
		})
		.catch((err)=>{ res.status(400).send(err); })
});

/* /GET request get details url  */
router.get('/sh/details/:idShort', function(req, res, next){
	dbLink.getDetails(req.params.idShort)
		.then((data)=>{ 
			res.set('Content-Type', 'application/json')
			.status(200)
			.json(data);
		})
		.catch((err)=>{ res.status(400).send(err); })
});

module.exports = router;