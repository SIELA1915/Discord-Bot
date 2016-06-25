var upm = {};

upm.args = "";
upm.help = "Updates your Ryzom API (This may take some seconds).";
upm.notservers = ["Ryzom Karavan"];
upm.main = (bot, msg) => {
    if (msg.channel.isPrivate || msg.channel.server.id == "175308871122812929") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	    var glo = require("../globalFuncs.js")();
	    var rChar = require("../ressources/ryzomapi/Char_Map.json")[msg.author.id];
	    glo.updateAPI([rChar], false);
	    bot.sendMessage(msg.channel, "Updated API for " + rChar + ".");
    }
}
module.exports = upm;
