exports.main = (id, bot) => {
    var timers = require('../ressources/atys/timers.json');
    var cT = timers.splice(id, 1);
    if (cT['until'] == 30) {
	// start new cycle
	bot.channels.find('id', cT['channel']).sendMessage('Season Change in ' + cT['until'] + ' ' + cT['untilText'] + '!');
	var nT = cT;
	var Atys = require ('../ressources/atys/time.js');
	var atysDate = new Atys(0);
	atysDate.setRLCountdown = (str, rlDate, channel) => {
	    nT['time'] = new Date().getTime + atysDate.rlMS - (3 * 60 * 60 * 1000);
	}
	nT['until'] = 3;
	nT['untilText'] = 'hours';
	var aTime = timeToGo(new Date(nT['time']));
	setTimeout(nT['function'], (aTime[0] * 60 * 60 * 1000) + (aTime[1] * 60 * 1000) + (aTime[2] * 1000), id, bot);
	timers[timers.size] = nT;
    } else {
	bot.channels.find('id', cT['channel']).sendMessage('Season Change in ' + cT['until'] + ' ' + cT['untilText'] + '!');
	var nT = cT;
	if (nT['until'] == 1)
	    nT['until'] = 30;
	else
	    nT['until']--;
	
	if (nT['until'] == 1)
	    nT['untilText'] = 'hour';
	else if (nT['until'] == 30)
	    nT['untilText'] = 'minutes';
	if (nT['until'] == 30)
	    nT['time'] = nT['time'] + 30 * 60 * 1000;
	else
	    nT['time'] = nT['time'] + 60 * 60 * 1000;
	var aTime = timeToGo(new Date(nT['time']));
	setTimeout(nT['function'], (aTime[0] * 60 * 60 * 1000) + (aTime[1] * 60 * 1000) + (aTime[2] * 1000), id, bot);
	timers[timers.size] = nT;
    }
}
