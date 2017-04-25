exports.main = (id, bot, over) => {
    var timers = require('../ressources/atys/timers.json');
//    var cT = timers.splice(id, 1);
    var cT = timers[id];
    var timerFuncs = require("../timerFuncs.js")();
    if (cT['until'] == 0) {
	// start new cycle
	if (!over && !cT['prep'])
	    bot.channels.find('id', cT['channel']).sendMessage('Season Change starts now! ' + bot.channels.find('id', cT['channel']).guild.roles.find("id", cT["role"]))
	    .catch(console.log);
	if (cT['prep']) {
	    var nT = cT;
	    nT['prep'] = 0;
	    var Atys = require('../ressources/atys/time.js');
	    var atysDate = new Atys(0);
	    atysDate.setRLCountdown = (str, rlDate, channel) => {
		nT['time'] = new Date().getTime() + atysDate.rlMS;
		var aTime = timeToGo(new Date(nT['time']));
		setTimeout(timerFuncs[nT["function"]], (aTime[0] * 60 * 60 * 1000) + (aTime[1] * 60 * 1000) + (aTime[2] * 1000), id, bot);
		timers[id] = nT;
		var fs = require("fs");
		fs.writeFileSync(__dirname + "/../ressources/atys/timers.json", JSON.stringify(timers), "utf8");
		delete require.cache[require.resolve('../ressources/atys/time.js')];
	    }
	} else {
	    setTimeout(function() {
		var nT = cT;
		nT['prep'] = 1;
		var Atys = require('../ressources/atys/time.js');
		var atysDate = new Atys(0);
		atysDate.setRLCountdown = (str, rlDate, channel) => {
		    nT['time'] = new Date().getTime() + atysDate.rlMS - (3 * 60 * 60 * 1000);
		    console.log("Season Change is on " + new Date(nT['time']).toUTCString());
		    nT['until'] = 3;
		    nT['untilText'] = 'hours';
		    var aTime = timeToGo(new Date(nT['time']));
		    setTimeout(timerFuncs[nT["function"]], (aTime[0] * 60 * 60 * 1000) + (aTime[1] * 60 * 1000) + (aTime[2] * 1000), id, bot);
		    timers[id] = nT;
		    var fs = require("fs");
		    fs.writeFileSync(__dirname + "/../ressources/atys/timers.json", JSON.stringify(timers), "utf8");
		    delete require.cache[require.resolve('../ressources/atys/time.js')];
		}
	    }, 10 * 60 * 1000);
	}
    } else {
	if (!over && !cT['prep'])
	    bot.channels.find("id", cT["channel"]).sendMessage('Season Change in ' + cT['until'] + ' ' + cT['untilText'] + '! ' + bot.channels.find('id', cT['channel']).guild.roles.find("id", cT["role"]))
	    .catch(console.log);
	if (cT['prep']) {
	    var nT = cT;
	    nT['prep'] = 0;
	    var Atys = require('../ressources/atys/time.js');
	    var atysDate = new Atys(0);
	    atysDate.setRLCountdown = (str, rlDate, channel) => {
		if (nT['until'] == 30)
		    nT['time'] = new Date().getTime() + atysDate.rlMS - (30 * 60 * 1000);
		else
		    nT['time'] = new Date().getTime() + atysDate.rlMS - (nT['until'] * 60 * 60 * 1000);
		var aTime = timeToGo(new Date(nT['time']));
		setTimeout(timerFuncs[nT["function"]], (aTime[0] * 60 * 60 * 1000) + (aTime[1] * 60 * 1000) + (aTime[2] * 1000), id, bot);
		timers[id] = nT;
		var fs = require("fs");
		fs.writeFileSync(__dirname + "/../ressources/atys/timers.json", JSON.stringify(timers), "utf8");
		delete require.cache[require.resolve('../ressources/atys/time.js')];
	    }
	} else {
	    var nT = cT;
	    nT['prep'] = 1;
	    if (nT['until'] == 1)
		nT['until'] = 30;
	    else if (nT['until'] == 30)
		nT['until'] = 0;
	    else
		nT['until']--;
	    
	    if (nT['until'] == 1)
		nT['untilText'] = 'hour';
	    else if (nT['until'] == 30)
	    nT['untilText'] = 'minutes';
	    if (nT['until'] == 30)
		nT['time'] = nT['time'] + 30 * 60 * 1000;
	    else if (nT['until'] == 0)
		nT['time'] = nT['time'] + 30 * 60 * 1000;
	    else
		nT['time'] = nT['time'] + 60 * 60 * 1000;
	    var aTime = timeToGo(new Date(nT["time"]));
	    setTimeout(timerFuncs[nT["function"]], (aTime[0] * 60 * 60 * 1000) + (aTime[1] * 60 * 1000) + (aTime[2] * 1000), id, bot);
	    timers[id] = nT;
	    var fs = require("fs");
	    fs.writeFileSync(__dirname + "/../ressources/atys/timers.json", JSON.stringify(timers), "utf8");
	}
    }
}
