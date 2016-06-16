'use strict';

var assert = require('assert');
var fs = require('fs');

var renderer = function(req, res, done){
	res.render = function(){
		renderer.renderer.apply(res, auguments);
	}
}

renderer.renderer = function(view, args, cb){
	var res = this;
	fs.readFile(view, function(err, buf){
		if(err){
			res.statusCode = 403;
			res.send(new Buffer('403 - Forbidden'));
			if(typeof cb == 'function') cb.call(null, new Error('Read File Error'));
			return;
		}else{
			var str = buf.toString();
			if('object' == typeof args){
				for(var i in args){
					var reg = new RegExp('\{\$' + i + '\}', 'gm');
					str = str.replace(reg, args[i]);
				}
			}
			
			res.send(new Buffer(str));
			if(typeof cb == 'function') cb.call(null);
			return;
		}
	});
}

renderer.set = function(cb){
	assert(typeof cb == 'function', 'Invalid renderer type');
	renderer.renderer = cb;
}