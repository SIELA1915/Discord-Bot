var fs = require("fs");

var looted = {};

looted.args = "<Named>";
looted.help = "Sets a timer of 50 minutes for Named."
looted.notservers = ["Ryzom Karavan"];
looted.main = (bot, msg) => {
    if (msg.channel.isPrivate || msg.channel.server.id == "175308871122812929") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
        var aArg = msg.content.split(' ');
	if (aArg.length >= 3) {
	    var name = aArg.slice(2).join(' ');
	    var timer = function timer(user, named) {
		bot.sendMessage(msg.channel, named + " will respawn in 5 minutes, " + user + "!");
	    }
	    var to = setTimeout(timer, 45 * 60 * 1000, msg.author.toString(), name);
	    bot.sendMessage(msg.channel, "Timer set");
	} else {
	    bot.sendMessage(msg.channel, "Not enough Arguments.");
	}
    }
}
module.exports = looted;
