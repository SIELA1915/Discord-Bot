var hugs = {};

hugs.args = "<name>";
hugs.help = "Hugs the specified user. If none specified, hugs you."
hugs.notservers = [];
hugs.main = (bot, msg) => {
    var aArg = msg.content.split(' ');
    var Arg = aArg[2];
	if (Arg) {
	    if (bot.users.get("username", Arg) != null) {
		bot.sendMessage(msg.channel, bot.user.username + " hugs " + bot.users.get("username", Arg) + "!");
	    } else {
		bot.sendMessage(msg.channel, bot.user.username + " hugs " + Arg + "!");
	    }
	} else {
	    bot.sendMessage(msg.channel, bot.user.username + " hugs " + msg.author);
	}
}
module.exports = hugs;
