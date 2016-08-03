var utc = {};

utc.args = "";
utc.help = "Shows time and date utc"
utc.notservers = [];
utc.main = (bot, msg) => {
    bot.sendMessage(msg.channel, new Date().toUTCString());
}
/*hugs.tags = ["hug"];
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
}*/
module.exports = utc;
