var gmotd = {};

function getGmotd(Guild) {
    var inf = [];
    var g = require("../ressources/ryzomapi/Guilds.json");
    var cGuild = g[Guild]["ryzomapi"]["guild"];

    inf[0] = cGuild["motd"];
    
    return inf;
}

gmotd.args = '';
gmotd.help = 'Gives you the actual guild message of the day.';
gmotd.notservers = [ 'Ryzom Karavan' ];
gmotd.main = (bot, msg, channel) => {
    var help = "Please connect a guild to the server.";
    var aArg = msg.content.split(' ');
    if (aArg.length <= 2) {
	var rGuild = require("../ressources/ryzomapi/Guild_Map.json")[msg.guild.id];
	var m = getGmotd(rGuild);
	if (m[0] != null) {
	    msg.guild.channels.find("name", "general").sendMessage(rGuild + "\'s guild message of the day: " + m[0]);
	} else {
	    channel.sendMessage(help);
	}
    } else {
	var rGuild = aArg.slice(2).join(" ");
	var m = getGmotd(rGuild);
	if (m[0] != null) {
	    msg.guild.channels.find("name", "general").sendMessage(rGuild + "\'s guild message of the day: " + m[0]);
	} else {
	    channel.sendMessage("Invalid guild name");
	}
    }
} 
module.exports = gmotd;
