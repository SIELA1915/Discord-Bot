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
hugs.tags = ["hug"];
hugs.mentions = [["hug <@", "hugs <@"]];
hugs.obl = [];
hugs.tagged = (bot, msg) => {
    var aArg = msg.mentions;

    var finArgs = [];
    var ordArgs = {};
    var cont = msg.content;
    for (var m in hugs.mentions) {
	var f = false;
	for (var a in hugs.mentions[m]) {
	    if (cont.indexOf(hugs.mentions[m][a]) != -1) {
		ordArgs[String(cont.indexOf(hugs.mentions[m][a]))] = m;
		f = true;
		break;
	    }
	}
	if (!f) {
	    ordArgs[String(2000+m)] = m;
	    aArg.push(bot.user);
	}
    }
    var i = 0;
    for (var o in ordArgs) {
	finArgs[ordArgs[o]] = aArg[i];
	++i;
    }
    
    bot.sendMessage(msg.channel, bot.user.username + " hugs " + finArgs[0] + "!");
}
module.exports = hugs;
