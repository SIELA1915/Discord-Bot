function getBosses() {
    var Bosses = require("../ressources/bosses/Bosses.json");
    var glo = require("../globalFuncs.js")();
   //Find corresponding Boss
    var sBoss = "";
    var found = 0;
    for (var BOSS in Bosses) {
	var cBoss = Bosses[BOSS];
	var bTime = new Date(cBoss.time);
	bTime.setTime(bTime.getTime() + (48 * 60 * 60 * 1000));
	var tillArr = glo.timeToGo(bTime);
	if (tillArr[3] < 0) {
	    sBoss += " " + BOSS;
	    console.log("Added " + BOSS + " to possible spawned bosses");
	    found = 1;
	}
    }

    if (!found) {
	console.log("Couldn't find any possibly spawned boss.");
	return ["Couldn't find any possibly spawned boss."];
    } else {
	//Return all available boss
	var Bosses = ["```diff\n+ These bosses might be spawned: "];
	var ind = 0;
	var Spawned = 0;
	var nind = 0;
	var nSpawned = 0;
	var nBosses = ["```diff\n- These bosses are not spawned: "];
	for (var BOSS in Bosses) {
	    var fBoss = Bosses[BOSS];
	    if (sBoss.includes(" " + BOSS)) {
		if (Spawned == 0) {
		    Bosses[ind] += fBoss.name;
		} else {
		    var add = ", " + fBoss.name;
		    console.log(add);
		    if (Bosses[ind].length + add.length + 3 > 2000) {
			Bosses[ind] += "```";
			++ind;
			Bosses[ind] = "```diff\n";
		    }
		    Bosses[ind] += add;
		}
		++Spawned;
	    } else {
		if (nSpawned == 0) {
		    nBosses[nind] += fBoss.name;
		} else {
		    var nadd = ", " + fBoss.name;
		    if (nBosses[nind].length + nadd.length + 3 > 2000) {
			nBosses[nind] += "```";
			++nind;
			nBosses[nind] = "```diff\n";
		    }
		    nBosses[nind] += nadd;
		}
		++nSpawned;
	    }
	}
	Bosses[ind] += "```";
	nBosses[nind] += "```";
	return Bosses.concat(nBosses);
    }
}

var gets = {};

gets.args = "";
gets.help = "Lists all bosses, grouped by possibly spawned or not."
gets.notservers = ["Ryzom Karavan"];
gets.main = (bot, msg) => {
    if (msg.channel.server.name == "Ryzom Karavan") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	var bosses = getBosses();
	for (var port in bosses) {
	    bot.sendMessage(msg.channel, bosses[port]);
	}
    }
}
module.exports = gets;
