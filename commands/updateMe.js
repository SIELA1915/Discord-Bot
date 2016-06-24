var upm = {};

upm.args = "";
upm.help = "Updates your Ryzom API (This may take some seconds).";
upm.notservers = ["Ryzom Karavan"];
upm.main = (bot, msg) => {
    if (msg.channel.server.name == "Ryzom Karavan") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	    var glo = require("../globalFuncs.js")();
	    var rChar = require("../ressources/ryzomapi/Char_Map.json")[msg.author.id];
	    glo.updateAPI([rChar], false);
	    bot.sendMessage(msg.channel, "Updated API for " + rChar + ". " + help);
    }
}
module.exports = upm;
