"use strict";

var fs = require('fs');

module.exports = () => {
    var files = fs.readdirSync(__dirname+'/globals');
    for (let file of files) {
        if (file.endsWith('.js')) {
	    var funcToAdd = require(__dirname+'/globals/'+file);
            exports[file.slice(0, -3)] = funcToAdd.main;
        }
    }
    console.log("———— All Globals Loaded! ————");
    return this;
}
