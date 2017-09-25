'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../strategies/passport-local/local-signup.js')(passport);
require('../strategies/passport-local/local-login.js')(passport);
const router = express.Router();
const User = require('../models/user.js');
const Link = require('../models/link.js');
const dbLink = require('../dbUtils/Link.js');
const config = require('../../web.config.json');
const request = require('request');

router.post('/login', function(req, res, next){
    if (req.body.email=='' || req.body.password==''){
        return res.status(400)
                .set('Content-Type', 'application/json')
                .json({
                    success: false,
                    message: 'Could not process the form'
            });
    }
	return passport.authenticate('local-signin', (err, token, userData)=>{
        if (err){
            if (err.name === 'IncorrectCreditalsError'){
                return res.status(409)
                    .set('Content-Type', 'application/json')
                    .json({
                        success: false,
                        message: 'Check the form for errors.',
                        errors:{message:"Invalid email or password." }    
                });
            }
            return res.status(400)
                .set('Content-Type', 'application/json')
                .json({
                    success: false,
                    message: 'Could not process the form'
            });
        }
        return res.status(200)
            .set('Content-Type', 'application/json')
            .json({
                success: true,
                message: 'You have successfully sign in!',
                token,
                user: userData
        });
    })(req,res,next);
});

router.post('/signup', function(req, res, next){
	return passport.authenticate('local-signup', function(err, token, userData){
		if (err){
			if (err.name === 'IncorrectCreditalsError'){
				return res.status(409)
                    .set('Content-Type', 'application/json')
                    .json({
    					success: false,
    					message: 'Check the form for errors',
    					errors:{
    						msg: err
    					}
				})
			}
            return res.status(400)
                .set('Content-Type', 'application/json')
                .json({
                    success: false,
                    message: 'Could not process the form.'
            });
		}
		return res.status(200)
            .set('Content-Type', 'application/json')
            .json({
                success: true,
                message: 'You have successfully signed up!',
                token,
                user: userData
        });
	})(req, res, next);
});

/*GET USER INFO*/
router.post('/profile', function(req, res, next){
	const token = req.body.token;
    const userData = jwt.verify(token, config.jwtSecret);
    User.findById({'_id':userData.sub})
        .then((data)=>{
            data.password = undefined;
            res.status(200)
            .set('Content-Type', 'application/json')
            .json(data)
        })
        .catch(err=>res.status(400).send());
});

/*GET SHORT LINKS BY USER*/
router.post('/link_history', function(req, res, next){
    const token = req.body.token;
    const userData = jwt.verify(token, config.jwtSecret);
    Link.find({$and:[{'authorId':userData.sub}, {visible: true}]}).sort({$natural: -1})
        .then((data)=>{
            res.status(200)
            .set('Content-Type', 'application/json')
            .json(data)
        })
        .catch((err)=>{
            res.status(400).send();
        })
});

/*SHORT LINK BY USER*/
router.post('/short', function(req, res, next){
    const token = req.body.token;
    const userData = jwt.verify(token, config.jwtSecret);
    const data = {
        long_url: req.body.long_url,
        authorId: userData.sub
    }
    dbLink.createShortLink(data)
        .then((data)=>{
            res.status(200)
            .set('Content-Type', 'application/json')
            .json(data)
        })
        .catch((err)=>{
            res.status(400).send();
        })
});

/*GET TITLE FOR LINK*/
router.post('/title', function(req, res, next){
    request(req.body.long_url,(err, response, body)=>{
        const re = /<title[^>]*>([\s\S]*?)<\/title>/;
        const result = JSON.stringify(body).match(re); 
        Link.update({short_url: req.body.short_url}, {title: result[1]})
            .then((data)=>{
                res.status(200)
                .set('Content-Type', 'application/json')
                .json({title: result[1]});
        })
        .catch(err=>res.status(400).send())
   });
});

/*HIDE LINKS*/
router.post('/hide', function(req, res, next){
    const list = req.body.listUser;
    const token = req.body.token;
    const userData = jwt.verify(token, config.jwtSecret);

    Link.update({
        authorId: userData.sub,
        _id:{
            $in: list
        }
    }, {visible: false}, {multi: true})
    .then(()=>{
            Link.find({$and:[{'authorId':userData.sub}, {visible: true}]}).sort({$natural: -1})
                .then((data)=>{
                    res.status(200)
                    .set('Content-Type', 'application/json')
                    .json(data)
                })
                .catch((err)=>{
                    res.status(400).send();
                })
        })
        .catch((err)=>{
            res.status(400).send();
        })
});

module.exports = router;