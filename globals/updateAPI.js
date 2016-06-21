var fs = require("fs");

exports.main = (user, guild) => {
    var request = require("request");
    var xml2js = require("xml2js");
    var parser = new xml2js.Parser();
    if (user != null) {
	var cDB = require("../ressources/ryzomapi/Characters.json");
	var cKeys = require("../ressources/ryzomapi/Char_Keys.json");
	for (var u in user) {
	    var ckey = cKeys[user[u]];
	    request.post({url:'http://api.ryzom.com/character.php', form: {apikey:ckey}}, function(err,httpResponse,body){
//		console.log("---------------Error--------------" + err);
//		console.log("---------------Body---------------" + body);
//		console.log("---------------Http---------------" + httpResponse);
		parser.parseString(body, function (err, result) {
		    console.log(err);
		    cDB[user[u]] = result;
		    fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Characters.json", JSON.stringify(cDB), "utf8");
		});
	    });
	}
    }
    if (guild) {
	var gDB = require("../ressources/ryzomapi/Guilds.json");
	var gKeys = require("../ressources/ryzomapi/Guild_Keys.json");
	for (var g in gKeys) {
	    var gkey = gKeys[g];
	    request.post({url:'http://api.ryzom.com/guild.php', form: {apikey:gkey}}, function(err,httpResponse,body){
		parser.parseString(body, function(err, result) {
		    gDB[g] = result;
		    console.log('Done: ' + g);
		});
	    });
	}
	fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Guilds.json", JSON.stringify(gDB), "utf8");
    }
}
