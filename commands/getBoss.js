function getBoss(Boss) {
    var Bosses = require("../ressources/bosses/Bosses.json");
    var glo = require("../globalFuncs.js")();
    //Find corresponding Boss
    var sBoss = 0;
    var found = 0;
    for (var BOSS in Bosses) {
	var cBoss = Bosses[BOSS];
	console.log("Boss: " + Boss +  " cBoss.name: " + cBoss.name + " cBoss.time: " + cBoss.time);
	if (cBoss.name == Boss) {
	    sBoss = BOSS;
	    found = 1;
	    break;
	}
    }

    if (!found) {
	console.log("Couldn't find Boss called: " + Boss);
	return "Couldn't find Boss called: " + Boss;
    } else {
	//Return time killed boss
	var fBoss = Bosses[sBoss];
	var bTime = new Date(fBoss.time);
	bTime.setTime(bTime.getTime() + (48 * 60 * 60 * 1000));
	var tillArr = glo.timeToGo(bTime);
	var next = "";
	if (tillArr[3] < 0) {
	    next = "This Boss might be available!";
	} else {
	    var sTill = tillArr[0] + " Hours " + tillArr[1] + " Minutes " + tillArr[2] + " Seconds";
	    next = "Earliest possible respawn in: " + sTill;
	}
	console.log(fBoss.name + " got last killed: " + fBoss.time + ".          " + next);
	return fBoss.name + " got last killed: " + new Date(fBoss.time).toUTCString() + ".          " + next;
    }
}

var get = {};

get.args = "<name>"
get.help = "Returns last time specified boss was killed and earliest time the boss might be respawned."
get.notservers = ["Ryzom Karavan"];
get.main = (bot, msg) => {
        if (msg.channel.isPrivate || msg.channel.server.id == "175308871122812929") {
	    bot.sendMessage(msg.channel, "This functionality isn't available.");
	} else {
            var aArg = msg.content.split(' ');
	    console.log(aArg);
	    if (aArg.length > 3) {
		bot.sendMessage(msg.channel, "Too many Arguments. Use:```xl\n/getboss <Boss>     'gets last kill and earliest respawn for Boss'\n```");
	    } else if (aArg.length == 3) {
		    bot.sendMessage(msg.channel, getBoss(aArg[2]));
	    } else {
		bot.sendMessage(msg.channel, "Not enough Arguments. Use:```xl\n/getboss <Boss>     'gets last kill and earliest respawn for Boss'\n```");
	    }
	}
}
module.exports = get;
