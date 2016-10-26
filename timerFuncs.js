"use strict";

var fs = require('fs');

module.exports = () => {
    var files = fs.readdirSync(__dirname+'/timers');
    for (let file of files) {
        if (file.endsWith('.js')) {
	    var funcToAdd = require(__dirname+'/timers/'+file);
	    this[file.slice(0, -3)] = funcToAdd.main;
        }
    }
    console.log("———— All Timer Functions Loaded! ————");
    return this;
}
