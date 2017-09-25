'use strict';

const isProduction = process.env.NODE_ENV.trim() === "production";
const isDevelopment= process.env.NODE_ENV.trim() === "development";

module.exports = {
    is_generate_css: isProduction,
	is_production: isProduction,
	is_development: isDevelopment
}