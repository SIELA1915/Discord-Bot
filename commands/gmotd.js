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
	console.log(aArg);
	console.log(aArg.length);
	if (aArg.length <= 2) {
	    console.log("get Connected");
	    var rGuild = require("../ressources/ryzomapi/Guild_Map.json")[msg.server.id];
	    var m = getGmotd(rGuild);
	    if (m[0] != null) {
		bot.sendMessage(msg.server.channels.get("name", "general"), rGuild + "'s guild message of the day: " + m[0]);
	    } else {
		bot.sendMessage(msg.channel, help);
	    }
	} else {
	    console.log("get by name: ");
	    var rGuild = aArg.slice(2).join(" ");
	    console.log(rGuild);
	    var m = getGmotd(rGuild);
	    if (m[0] != null) {
		bot.sendMessage(msg.server.channels.get("name", "general"), rGuild + "'s guild message of the day: " + m[0]);
	    } else {
		bot.sendMessage(msg.channel, help);
	    }
	}
    }
}
module.exports = getm;
