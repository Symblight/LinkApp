'use strict';

const rules = [
    {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        use:[
            {
                loader: 'babel-loader',
                options:{
                    plugins:['react-hot-loader/babel']
                }
            }
        ]
    },
];

module.exports.config = rules;