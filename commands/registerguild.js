var registerguild = {};

var fs = require("fs");

registerguild.args = '<API-Key> <Guild Name>';
registerguild.help = 'Connects the API-Key with Guild Name';
registerguild.notservers = [ 'Ryzom Karavan' ];
registerguild.main = (bot, msg, channel) => {
    var help = "Use: ```xl\n/amee registerGuild API-Key Guild Name     'registers the API-Key for Guild Name'\n```";
    var aArg = msg.content.split(' ');
    if (aArg.length >= 4) {
	var gKeys = require("./../ressources/ryzomapi/Guild_Keys.json");
	var mGuilds = require("./../ressources/ryzomapi/Guild_Map.json");
	var dServ = msg.guild.id;
	var gKey = aArg[2];
	var rGuild = aArg.splice(3).join(" ");
	if (mGuilds[dServ] != undefined && mGuilds[dServ] != rGuild) {
	    channel.sendMessage("Attention! There's already a guild connected to this server. Your guild key won't be connected to this server.");
	} else {
	    mGuilds[dServ] = rGuild;
	    fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Guild_Map.json", JSON.stringify(mGuilds), "utf8");
	}
	gKeys[rGuild] = gKey;
	fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Guild_Keys.json", JSON.stringify(gKeys), "utf8");
	updateAPI(null, true);
	channel.sendMessage("Registered");
    } else {
	channel.sendMessage("Not enough Arguments. " + help);
    }
} 
module.exports = registerguild;
