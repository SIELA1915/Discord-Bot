var fs = require("fs");

function getGmotd(Guild) {
    var inf = [];
    var g = require("../ressources/ryzomapi/Guilds.json");
    var cGuild = g[Guild]["ryzomapi"]["guild"];

    inf[0] = cGuild["motd"];
    
    return inf;
}

var getm = {};

getm.args = "";
getm.help = "Gives you the actual guild message of the day.";
getm.notservers = ["Ryzom Karavan"];
getm.main = (bot, msg) => {
    if (msg.channel.isPrivate || msg.channel.server.id == "175308871122812929") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	var help = "Please connect a guild to the server.";
        var aArg = msg.content.split(' ');
	if (aArg.length = 2) {
	    var rGuild = require("../ressources/ryzomapi/Guild_Map.json")[msg.server.id];
	    var m = getGmotd(rGuild);
	    if (m[0] != null) {
		bot.sendMessage(msg.server.channels.get("name", "general"), rGuild + "'s guild message of the day: " + m[0]);
	    } else {
		bot.sendMessage(msg.channel, help);
	    }
	} else {
	    var rGuild = aArg.splice(2).join(" ");
	    var m = getGmotd(rGuild);
	    if (m[0] != null) {
		bot.sendMessage(msg.server.channels.get("name", "general"), rGuild + "'s guild message of the day: " + m[0]);
	    } else {
		bot.sendMessage(msg.channel, help);
	    }
	}
	updateAPI([], true);
    }
}
module.exports = getm;
