'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const linkSchema = new Schema({
	short_url	: 	{ type: String, required: true, unique: true, trim: true },
	long_url	: 	{ type: String, required: true },
	title		: 	{ type: String, trim: true },
	createAt	:   { type: String, required: true },
	visible		:   { type: Boolean, required: true },
	authorId	: 	{ type: ObjectId, ref: 'users' },
	details		:   {
		clicks	: 	{ type: Number, defualt: 0 },
		location: 	{ type: String },
	}
}, {collection: 'links'});

const LinkModel = mongoose.model('Link', linkSchema);

module.exports = LinkModel;