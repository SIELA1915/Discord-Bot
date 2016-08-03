var fs = require("fs");

function killedBoss(Boss, d, bot, msg) {
    var Bosses = require("../ressources/bosses/Bosses.json");
    var cTime = d===0?new Date():d;
    //Find corresponding Boss
    var sBoss = 0;
    var found = 0;
    for (var BOSS in Bosses) {
	var cBoss = Bosses[BOSS];
	console.log("Boss: " + Boss + " Time: " + cTime + " cBoss.name: " + cBoss.name + " cBoss.time: " + cBoss.time);
	if (cBoss.name == Boss) {
	    sBoss = BOSS;
	    found = 1;
	    break;
	}
    }
    
    if (!found) {
	console.log("Couldn't find Boss called: " + Boss);
	var sTime = cTime.toUTCString();
	console.log("Added Boss: " + Boss + " to last killed: " + sTime);
	Bosses[Bosses.length] = {"name":Boss, "time":cTime.getTime()};
	fs.writeFileSync("Bosses.json", JSON.stringify(Bosses), "utf8");
	return "Added Boss: " + Boss + " to last killed: " + sTime;
    } else {
	//Update Boss in DB
	var sTime = cTime.toUTCString();
	console.log("Updated Boss: " + Boss + " to last killed: " + sTime);
	Bosses[sBoss].time = cTime.getTime();
	fs.writeFileSync(__dirname + "/../ressources/bosses/Bosses.json", JSON.stringify(Bosses), "utf8");
	var timer = function timer(B) {
	    bot.sendMessage(msg.channel, B + " might first respawn in 5 minutes!");
	}
	var rTime = new Date(cTime);
	rTime.setTime(rTime.getTime() + (48 * 60 * 60 * 1000) - (5 * 60 * 1000));
	var tarr = timeToGo(rTime);
	var to = setTimeout(timer, (tarr[0] * 60 * 60 * 1000) + (tarr[1] * 60 * 1000) + (tarr[2] * 1000), Boss);
	return "Updated Boss: " + Boss + " to last killed: " + sTime;
    }
}

var kill = {};

kill.args = "<boss> <iso-timestamp>";
kill.help = "Registers a kill for specified boss. If no iso-timestamp is specified, registers for current time.";
kill.notservers = ["Ryzom Karavan"];
kill.main = (bot, msg) => {
    	if (msg.channel.isPrivate || msg.channel.server.id == "175308871122812929") {
	    bot.sendMessage(msg.channel, "This functionality isn't available.");
	} else{
	    var aArg = msg.content.split(' ');
	    if (aArg.length > 4) {
                bot.sendMessage(msg.channel, "Too many Arguments. Use either:```xl\n/killedboss <Boss>     'registers kill for Boss at current time'\n/killedboss <Boss> <iso-timestamp>     'registers kill for Boss at ISOTimeStamp'\nCurrent ISO Timestamp: " + new Date().toISOString() + "\n```");
	    } else if (aArg.length == 4) {
		bot.sendMessage(msg.channel, killedBoss(aArg[2], new Date(aArg[3]), bot, msg));
	    } else if (aArg.length == 3) {
		bot.sendMessage(msg.channel, killedBoss(aArg[2], 0, bot, msg));
	    } else {
		bot.sendMessage(msg.channel, "Too many Arguments. Use either:```xl\n/killedboss <Boss>     'registers kill for Boss at current time'\n/killedboss <Boss> <iso-timestamp>     'registers kill for Boss at ISOTimeStamp'\nCurrent ISO Timestamp: " + new Date().toISOString() + "\n```");
	    }
	}
}
module.exports = kill;
