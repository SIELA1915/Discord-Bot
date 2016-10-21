var getbosses = {};

function getBosses() {
    var Bosses = require("../ressources/bosses/Bosses.json");
    Bosses.sort((a,b) => {
	if (a.time < b.time)
	    return 1;
	else if (a.time > b.time)
	    return -1;
	else
	    return 0;
    });
    //Find first non-spawned Boss
    var lBoss = "";
    var found = 0;
    for (var BOSS in Bosses) {
	var cBoss = Bosses[BOSS];
	console.log(cBoss.time);
	var bTime = new Date(cBoss.time);
	bTime.setTime(bTime.getTime() + (48 * 60 * 60 * 1000));
	var tillArr = timeToGo(bTime);
	if (tillArr[3] < 0) {
	    lBoss = cBoss.name;
	    console.log("first spawned boss: " + lBoss);
	    found = 1;
	    break;
	}
    }

    if (!found) {
	console.log("Couldn't find any possibly spawned boss.");
	return ["Couldn't find any possibly spawned boss."];
    } else {
	//Return all available boss
	var sBosses = ["```diff\n+ These bosses might be spawned: "];
	var ind = 0;
	var Spawned = 0;
	var nind = 0;
	var nSpawned = 0;
	var limit = false;
	var nBosses = ["```diff\n- These bosses are not spawned: "];
	for (var BOSS in Bosses) {
	    var fBoss = Bosses[BOSS];
	    if (fBoss.name == lBoss) limit = true;
	    if (!limit) {
		if (Spawned == 0) {
		    sBosses[ind] += fBoss.name;
		} else {
		    var add = ", " + fBoss.name;
		    if (sBosses[ind].length + add.length + 3 > 2000) {
			sBosses[ind] += "```";
			++ind;
			sBosses[ind] = "```diff\n";
		    }
		    sBosses[ind] += add;
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
	sBosses[ind] += "```";
	nBosses[nind] += "```";
	return sBosses.concat(nBosses);
    }
}

getbosses.args = '';
getbosses.help = 'Lists all bosses, grouped by possibly spawned or not.';
getbosses.notservers = [ 'Ryzom Karavan' ];
getbosses.main = (bot, msg, channel) => {
	var bosses = getBosses();
	for (var port in bosses) {
	    channel.sendMessage(bosses[port]);
    }
} 
module.exports = getbosses;
