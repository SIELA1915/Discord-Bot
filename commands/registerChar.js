var fs = require("fs");

var reg = {};

reg.args = "";
reg.help = "Shows you all upcoming op wars. Annoucnements in English, French and German."
reg.notservers = ["Ryzom Karavan"];
reg.main = (bot, msg) => {
    if (msg.channel.server.name == "Ryzom Karavan") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	var glo = require("./../globalFuncs.js");
	var cKeys = require("./../ressources/ryzomapi/Char_Keys.json");
	var mChars = require("./../ressources/ryzomapi/Char_Map.json");
	var help = "You best use this command in PM with Amee, so others don't get you API-Key. Use: ```xl\n/amee registerChar IG-Name API-Key     'registers the author for IG-Name and API-Key'\n```";
        var aArg = msg.content.split(' ');
	if (aArg.length >= 4) {
	    var dChar = msg.author.id;
	    var rChar = aArg[2];
	    var cKey = aArg[3];
	    if (mChars[dChar] != undefined) {
		bot.sendMessage(msg.channel, "Attention! You're changing your in-game name. Is this really what you want to do?");
		var c = require("../ressources/ryzomapi/Characters.json");
		c[mChars[dChar]] = undefined;
	    }
	    mChars[dChar] = rChar;
	    fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Char_Map.json", JSON.stringify(mChars), "utf8");
	    cKeys[rChar] = cKey;
	    fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Char_Keys.json", JSON.stringify(cKeys), "utf8");
	    glo.updateAPI([rChar], false);
	    bot.sendMessage(msg.channel, "Registered");
	} else {
	    bot.sendMessage(msg.channel, "Not enough Arguments. " + help);
	}
    }
}
module.exports = reg;
