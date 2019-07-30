const glob = require('glob'),
	{ resolve } = require('path'),
	_ = require('lodash');

const config = {};

function load(){
	let routers = [];
	glob.sync(resolve(__dirname, './', '**/*.json'))
		.filter(value => (value.indexOf('index.js') === -1))
		.map(item => {
			_.merge(config, require(item));
		});
	// console.log(config);
}

load();

module.exports = config;