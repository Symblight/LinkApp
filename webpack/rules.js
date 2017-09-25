'use strict';

module.exports.config = [
    ...require('./rules/scripts.js').config,
    ...require('./rules/styles').config,
    ...require('./rules/images').config
];