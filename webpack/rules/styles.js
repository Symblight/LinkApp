'use strict';

const define = require('../define.js');
const postcss = require('../postcss');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rules = [];

if (define.is_generate_css){
    rules.push({
        test: /\.sass|scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
                'css-loader',
                'sass-loader'
            ]
        })
    })
} else {
    rules.push(
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader?sourceMap',
            ],
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
    )
}

module.exports.config = rules;