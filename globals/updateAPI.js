var fs = require("fs");

exports.main = (user, guild) => {
    var request = require("request");
    var xml2js = require("xml2js");
    var parser = new xml2js.Parser({explicitArray: false});
    if (user != null && user.length > 0) {
	var cDB = require("../ressources/ryzomapi/Characters.json");
	var cKeys = require("../ressources/ryzomapi/Char_Keys.json");
	for (var u in user) {
	    var ckey = cKeys[user[u]];
	    var d;
	    request.post({url:'http://api.ryzom.com/character.php', form: {apikey:ckey}}, function(err,httpResponse,body){
		//		console.log("---------------Error--------------" + err);
		//		console.log("---------------Body---------------" + body);
		//		console.log("---------------Http---------------" + httpResponse);
		parser.parseString(body, function (err, result) {
		    console.log(err);
		    cDB[user[u]] = result;
		    fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Characters.json", JSON.stringify(cDB), "utf8");
		    d = true;
//		    console.log("done with " + u);
		});
	    });
	    /*	    while(d === undefined) {
		    require('deasync').runLoopOnce();
		    }
	    */	    
	}
    }
    if (guild) {
	var gDB = require("../ressources/ryzomapi/Guilds.json");
	var gKeys = require("../ressources/ryzomapi/Guild_Keys.json");
	for (var g in gKeys) {
	    (function(g) {
		var gkey = gKeys[g];
		var d;
//		console.log('starting: ' + g + " with key: " + gkey);
		request.post({url:'http://api.ryzom.com/guild.php', form: {apikey:gkey}}, function(err,httpResponse,body){
		    parser.parseString(body, function(err, result) {
			if (err) console.log(err);
			gDB[g] = result;
//			console.log('Done: ' + g + " with key: " + gkey);
			fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Guilds.json", JSON.stringify(gDB), "utf8");
//			console.log("Succesfully wrote to file");
			d = true;
		    });
		});
//		console.log("Finished function");
	    })(g);
	    /*	    while(d === undefined) {
		    require('deasync').runLoopOnce();
		    }
	    */
	}
    }
//    console.log("Started all requests");
}
