var killedboss = {};

var fs = require("fs");

var channel = "219900116281065474";

function killedBoss(Boss, d, bot, msg) {
    var Bosses = require("../ressources/bosses/Bosses.json");
    var cTime = d===0?new Date():d;
    //Find corresponding Boss
    var sBoss = 0;
    var found = 0;
    for (var BOSS in Bosses) {
	var cBoss = Bosses[BOSS];
	//console.log("Boss: " + Boss + " Time: " + cTime + " cBoss.name: " + cBoss.name + " cBoss.time: " + cBoss.time);
	if (cBoss.name.toLowerCase() == Boss.toLowerCase()) {
	    sBoss = BOSS;
	    found = 1;
	    break;
	}
    }
    
    if (!found) {
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
	var ftimer = (bossBot, B) => {
	    bossBot.channels.find("id", "219900116281065474").sendMessage(B + " might first respawn in 30 minutes!");
	}
	var fTime = new Date(cTime);
	fTime.setTime(fTime.getTime() + (48 * 60 * 60 * 1000) - (30 * 60 * 1000));
	var farr = timeToGo(fTime);
	var ltimer = (bossBot, B) => {
	    bossBot.channels.find("id", "219900116281065474").sendMessage(B + " might first respawn in 30 minutes!");
	}
	var lTime = new Date(cTime);
	lTime.setTime(lTime.getTime() + (96 * 60 * 60 * 1000) - (30 * 60 * 1000));
	var larr = timeToGo(lTime);
	var tof = setTimeout(ftimer, (farr[0] * 60 * 60 * 1000) + (farr[1] * 60 * 1000) + (farr[2] * 1000), bot, Boss);
	var tol = setTimeout(ltimer, (larr[0] * 60 * 60 * 1000) + (larr[1] * 60 * 1000) + (larr[2] * 1000), bot, Boss);
	return "Updated Boss: " + Boss + " to last killed: " + sTime;
    }
}

killedboss.args = '<boss> <iso-timestamp>';
killedboss.help = 'Registers a kill for specified boss. If no iso-timestamp is specified, registers for current time.';
killedboss.notservers = [ 'Ryzom Karavan' ];
killedboss.main = (bot, msg, channel) => {
	    var aArg = msg.content.split(' ');
	    if (aArg.length > 4) {
                channel.sendMessage("Too many Arguments. Use either:```xl\n/killedboss <Boss>     'registers kill for Boss at current time'\n/killedboss <Boss> <iso-timestamp>     'registers kill for Boss at ISOTimeStamp'\nCurrent ISO Timestamp: " + new Date().toISOString() + "\n```");
	    } else if (aArg.length == 4) {
		channel.sendMessage(killedBoss(aArg[2], new Date(aArg[3]), bot, msg));
	    } else if (aArg.length == 3) {
		channel.sendMessage(killedBoss(aArg[2], 0, bot, msg));
	    } else {
		channel.sendMessage("Not enough Arguments. Use either:```xl\n/killedboss <Boss>     'registers kill for Boss at current time'\n/killedboss <Boss> <iso-timestamp>     'registers kill for Boss at ISOTimeStamp'\nCurrent ISO Timestamp: " + new Date().toISOString() + "\n```");
	    }
} 
module.exports = killedboss;
