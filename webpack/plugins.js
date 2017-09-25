'use strict';

const webpack = require('webpack');
const define = require('./define');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: true,
		})
];

if (define.is_production){
	plugins.push(...require('./plugins/production').config);
}
if (define.is_development){
	plugins.push(...require('./plugins/development').config);
}

module.exports.config = plugins;