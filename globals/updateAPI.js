var fs = require("fs");

exports.main = (user, guild) => {
    if (user != null) {
	var cDB = require("../ressources/ryzomapi/Characters.json");
	var cKeys = require("../ressources/ryzomapi/Char_Keys.json");
	for (var u in user) {
	    var ckey = cKeys[user[u]];
	    request.post({url:'http://api.ryzom.com/character.php', form: {apikey:ckey}}, function(err,httpResponse,body){
		parser.parseString(body, function (err, result) {
		    cDB[user[u]] = result;
		    console.log('Done: ' + user[u]);
		})
	    });
	}
	fs.writeFileSync("../ressources/ryzomapi/Characters.json", JSON.stringify(cDB), "utf8");
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
	fs.writeFileSync("../ressources/ryzomapi/Guilds.json", JSON.stringify(gDB), "utf8");
    }
}
