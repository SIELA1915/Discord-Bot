coffee.args = '<name>';
coffee.help = 'Gives coffee to the specified user. If none specified, gives coffee to you.';
coffee.notservers = [];
coffee.main = (bot, msg, channel) => {
    var mEnd = "! Here you have some coffee as a gift from me!\n   ( (\n    ) )\n  ..............\n  |           |]\n  \\         /\n    `----'";
    var aArg = msg.content.split(' ');
    var Arg = aArg[2];
    if (Arg) {
	if (bot.users.get("username", Arg) != null) {
	    channel.sendMessage(bot.user.username + " aiye, " + bot.users.get("username", Arg) + mEnd)
.catch(console.log);
	} else {
	    channel.sendMessage(bot.user.username + " aiye, " + Arg + mEnd)
.catch(console.log);
	}
    } else {
	channel.sendMessage(bot.user.username + " aiye, " + msg.author + mEnd)
.catch(console.log);
    }
};
coffee.tags = [ 'give', 'coffee' ];
coffee.mentions = [ 'to <@', 'from <@' ];
coffee.obl = [];
coffee.tagged = (bot, msg, channel) => {
    var mMid = "! Here you have some coffee as a gift from ";
    var mEnd = "!\n   ( (\n    ) )\n  ..............\n  |           |]\n  \\         /\n    `----'";
    var aArg = msg.mentions;

    var finArgs = [];
    var ordArgs = {};
    var cont = msg.content;
    for (var m in coffee.mentions) {
	if (cont.indexOf(coffee.mentions[m]) == -1) {
	    ordArgs[String(2000+m)] = m;
	    aArg.push(bot.user);
	} else {
	    ordArgs[String(cont.indexOf(coffee.mentions[m]))] = m;
	}
    }
    var i = 0;
    for (var o in ordArgs) {
	finArgs[ordArgs[o]] = aArg[i];
	++i;
    }

    channel.sendMessage(bot.user.username + " aiye, " + finArgs[0] + mMid + finArgs[1] + mEnd)
.catch(console.log);
}
