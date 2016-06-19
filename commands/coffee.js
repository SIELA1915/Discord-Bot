var coffee = {};

coffee.args = "<name>";
coffee.help = "Gives coffee to the specified user. If none specified, gives coffee to you.";
coffee.notservers = [];
coffee.main = (bot, msg) => {
    var mEnd = "! Here you have some coffee as a gift from me!\n   ( (\n    ) )\n  ..............\n  |           |]\n  \\         /\n    `----'";
    var aArg = msg.content.split(' ');
    var Arg = aArg[2];
	if (Arg) {
	    if (bot.users.get("username", Arg) != null) {
		bot.sendMessage(msg.channel, bot.user.username + " aiye, " + bot.users.get("username", Arg) + mEnd);
	    } else {
		bot.sendMessage(msg.channel, bot.user.username + " aiye, " + Arg + mEnd);
	    }
	} else {
	    bot.sendMessage(msg.channel, bot.user.username + " aiye, " + msg.author + mEnd);
	}
}
module.exports = coffee;
