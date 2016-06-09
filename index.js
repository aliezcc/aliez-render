'use strict';

var path = require('path');
var assert = require('assert');

module.exports = function(req, res, done){
	res.dir = function(dir){
		assert(typeof dir == 'string', 'Invalid dir type');
		if(typeof req.REQUEST[0] != 'string'){
			res.statusCode = 500;
			res.send(new Buffer(''));
			return;
		}
		
		var file = req.REQUEST[0].replace('../', '');
		file = path.join(dir, file);
		res.send(file);
	}
	
	done();
}