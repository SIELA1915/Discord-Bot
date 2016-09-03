var fs = require("fs");

var reg = {};

reg.args = "<IG-Name> <API-Key>";
reg.help = "Connects your Discord id with your in-game name and API-Key"
reg.notservers = ["Ryzom Karavan"];
reg.main = (bot, msg) => {
    if (msg.channel.isPrivate || msg.channel.server.id == "175308871122812929") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	var help = "Use: ```xl\n/amee registerChar IG-Name API-Key     'registers the author for IG-Name and API-Key'\n```";
        var aArg = msg.content.split(' ');
	if (aArg.length >= 4) {
	var cKeys = require("./../ressources/ryzomapi/Char_Keys.json");
	var mChars = require("./../ressources/ryzomapi/Char_Map.json");
	    var dChar = msg.author.id;
	    var rChar = aArg[2];
	    var cKey = aArg[3];
	    if (mChars[dChar] != undefined && mChars[dChar] != rChar) {
		bot.sendMessage(msg.channel, "Attention! You're changing your in-game name. Is this really what you want to do?");
		var c = require("../ressources/ryzomapi/Characters.json");
		c[mChars[dChar]] = undefined;
	    }
	    mChars[dChar] = rChar;
	    fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Char_Map.json", JSON.stringify(mChars), "utf8");
	    cKeys[rChar] = cKey;
	    fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Char_Keys.json", JSON.stringify(cKeys), "utf8");
	    updateAPI([rChar], false);
	    bot.sendMessage(msg.channel, "Registered");
	} else {
	    bot.sendMessage(msg.channel, "Not enough Arguments. " + help);
	}
    }
}
module.exports = reg;
