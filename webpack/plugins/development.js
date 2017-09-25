'use strict';

const webpack = require('webpack');

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('development'),
		},
	}),
]

module.exports.config = plugins;