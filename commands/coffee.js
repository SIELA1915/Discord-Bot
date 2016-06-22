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
coffee.tags = ["give", "coffee"];
coffee.mentions = ["to @", "from @"];
coffee.obl = [];
coffee.tagged = (bot, msg) => {
    var mMid = "! Here you have some coffee as a gift from ";
    var mEnd = "!\n   ( (\n    ) )\n  ..............\n  |           |]\n  \\         /\n    `----'";
    var aArg = msg.mentions;
    for (var a in aArg) {
	if (aArg[a].id == bot.id) {
	    aArg.splice(a, 1);
	    break;
	}
    }
    var ordArgs = [];
    if (msg.content.indexOf(coffee.mentions[0]) < 0 && msg.content.indexOf(coffe.mentions[1]) < 0) {
	ordArgs[0] = bot.user;
	ordArgs[1] = bot.user;
    } else if (msg.content.indexOf(coffee.mentions[0] < 0)) {
	ordArgs[0] = bot.user;
	ordArgs[1] = aArg[0];
    } else if (msg.content.indexOf(coffee.mentions[1] < 0)) {
	ordArgs[0] = aArg[0];
	ordArgs[1] = msg.author;
    } else if (msg.content.indexOf(coffee.mentions[0]) > msg.content.indexOf(coffee.mentions[1])) {
	ordArgs[0] = aArg[1];
	ordArgs[1] = aArg[0];
    } else {
	ordArgs[0] = aArg[0];
	ordArgs[1] = aArg[1];
    }
    bot.sendMessage(msg.channel, bot.user.username + " aiye, " + ordArgs[0] + mMid + ordArgs[1] + mEnd);
}
module.exports = coffee;
