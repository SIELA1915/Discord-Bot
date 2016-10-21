function getBoss(Boss) {
    var Bosses = require("../ressources/bosses/Bosses.json");
    //Find corresponding Boss
    var sBoss = 0;
    var found = 0;
    for (var BOSS in Bosses) {
	var cBoss = Bosses[BOSS];
	console.log("Boss: " + Boss +  " cBoss.name: " + cBoss.name + " cBoss.time: " + cBoss.time);
	if (cBoss.name.toLowerCase() == Boss.toLowerCase()) {
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
	var tillArr = timeToGo(bTime);
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

getboss.args = '<name>';
getboss.help = 'Returns last time specified boss was killed and earliest time the boss might be respawned.';
getboss.notservers = [ 'Ryzom Karavan' ];
getboss.main = (bot, msg, channel) => {
            var aArg = msg.content.split(' ');
	    if (aArg.length > 3) {
		channel.sendMessage("Too many Arguments. Use:```xl\n/getboss <Boss>     'gets last kill and earliest respawn for Boss'\n```");
	    } else if (aArg.length == 3) {
		    channel.sendMessage(getBoss(aArg[2]));
	    } else {
		channel.sendMessage("Not enough Arguments. Use:```xl\n/getboss <Boss>     'gets last kill and earliest respawn for Boss'\n```");
	    }
} 
