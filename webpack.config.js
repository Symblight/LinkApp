'use strict';

const webpack = require('webpack');
const path = require('path');

const rules = require('./webpack/rules.js');
const plugins = require('./webpack/plugins.js');

const isProduction = process.env.NODE_ENV.trim() === "production";

const developmentConfig = {
		app:[
            'webpack-hot-middleware/client?reload=true',
            'react-hot-loader/patch',
			path.join(__dirname, 'app/main.js'),
		]
}

const productionConfig = {
	app:[
		path.join(__dirname, 'app/main.js'),
	]
}

module.exports = {
    devtool: isProduction ? false : 'source-map',
    entry: isProduction? productionConfig : developmentConfig,
	output: {
		filename: '[name].bundle.js',
    	publicPath: '',
        path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: rules.config
	},
	resolve:{
		extensions:['.js', '.jsx'],
	},
	plugins: plugins.config,
}