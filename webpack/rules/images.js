'use strict';

const rules = [
                {
                    test: /\.(jpg|png|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name]-[hash].[ext]'
                    },
                },
    ]
    
module.exports.config = rules;