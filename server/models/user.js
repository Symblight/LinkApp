'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

let Schema = mongoose.Schema;

const SchemaUser = new Schema({
	authId: 	{ type: String },
	username: 	{ type: String, required: true, unique: true, min: 4, max: 10, trim: true },
	email: 		{ type: String, required: true, unique: true, trim: true },
	password: 	{ type: String, required: true, min: 6, trim: true },
	firstname: 	{ type: String, required: true, min: 2, trim: true },
	lastname: 	{ type: String, required: true, min: 2, trim: true }
},{collection: 'users'});

SchemaUser.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

SchemaUser.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);  
};

module.exports = mongoose.model('user', SchemaUser);