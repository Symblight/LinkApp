'use strict';

var Link = require('../models/link.js');
var mongoose = require('mongoose');

function genId(){
    const _literals = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'; 
    const _length = _literals.length; 
    let _result = ''; 
    let _number = new Date*1000+(Math.random()*1000|0); 
        while (_number >= _length) { 
            _result += _literals[_number % _length]; 
            _number=Math.floor(_number/_length) 
        } 
    return _result; 
}

module.exports = {
	createShortLink : function(link){
			const _link = new Link({
				short_url : genId().slice(-7),
				long_url: link.long_url,
				createAt: new Date(),
				visible: true,
				authorId: link.authorId,
				title: '',
				details:{
					clicks: 0,
					location:'',
				}
			});

			return _link.save();
		},

		getLink: function(idlink){
			return Link.findOneAndUpdate({short_url:idlink}, { $inc : {'details.clicks':1} });
		},

		getDetails: function(idlink){
			return Link.find({short_url:idlink});
		},

		getList: function(user){
			return Link.find({$and:[ {authorId:user._id}, {visible: true} ] });
		},

		getListGuest: function(list){
			return Link.find({'short_url':{ $in: list} }).sort({date:-1}).sort({$natural: -1}); 
		},

		updateUrl: function(id){
			
		}
}