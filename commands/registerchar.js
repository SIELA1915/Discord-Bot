var registerchar = {};

var fs = require("fs");

registerchar.args = '<IG-Name> <API-Key>';
registerchar.help = 'Connects your Discord id with your in-game name and API-Key';
registerchar.notservers = [ 'Ryzom Karavan' ];
registerchar.main = (bot, msg, channel) => {
    var help = "Use: ```xl\n/amee registerChar IG-Name API-Key     'registers the author for IG-Name and API-Key'\n```";
    var aArg = msg.content.split(' ');
    if (aArg.length >= 4) {
	var cKeys = require("./../ressources/ryzomapi/Char_Keys.json");
	var mChars = require("./../ressources/ryzomapi/Char_Map.json");
	var dChar = msg.author.id;
	var rChar = aArg[2];
	var cKey = aArg[3];
	if (mChars[dChar] != undefined && mChars[dChar] != rChar) {
	    channel.sendMessage("Attention! You're changing your in-game name. Is this really what you want to do?");
	    var c = require("../ressources/ryzomapi/Characters.json");
	    c[mChars[dChar]] = undefined;
	}
	mChars[dChar] = rChar;
	fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Char_Map.json", JSON.stringify(mChars), "utf8");
	cKeys[rChar] = cKey;
	fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Char_Keys.json", JSON.stringify(cKeys), "utf8");
	updateAPI([rChar], false);
	channel.sendMessage("Registered");
    } else {
	channel.sendMessage("Not enough Arguments. " + help);
    }
} 
module.exports = registerchar;
