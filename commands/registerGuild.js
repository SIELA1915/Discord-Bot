var fs = require("fs");

var reg = {};

reg.args = "<API-Key> <Guild Name>";
reg.help = "Connects the API-Key with Guild Name"
reg.notservers = ["Ryzom Karavan"];
reg.main = (bot, msg) => {
    if (msg.channel.isPrivate || msg.channel.server.id == "175308871122812929") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	var help = "Use: ```xl\n/amee registerGuild API-Key Guild Name     'registers the API-Key for Guild Name'\n```";
        var aArg = msg.content.split(' ');
	if (aArg.length >= 4) {
	var gKeys = require("./../ressources/ryzomapi/Guild_Keys.json");
	var mGuilds = require("./../ressources/ryzomapi/Guild_Map.json");
	    var dServ = msg.server.id;
	    var gKey = aArg[2];
	    var rGuild = aArg.splice(3).join(" ");
	    if (mGuilds[dServ] != undefined && mGuilds[dServ] != rGuild) {
		bot.sendMessage(msg.channel, "Attention! There's already a guild connected to this server. Your guild key won't be connected to this server.");
	    } else {
		mGuilds[dServ] = rGuild;
		fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Guild_Map.json", JSON.stringify(mGuilds), "utf8");
	    }
	    gKeys[rGuild] = gKey;
	    fs.writeFileSync(__dirname + "/../ressources/ryzomapi/Guild_Keys.json", JSON.stringify(gKeys), "utf8");
	    updateAPI([], true);
	    bot.sendMessage(msg.channel, "Registered");
	} else {
	    bot.sendMessage(msg.channel, "Not enough Arguments. " + help);
	}
    }
}
module.exports = reg;
