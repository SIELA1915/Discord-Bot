var fs = require("fs");

function getInfo(Mode, Boss) {
    switch (Mode) {
    case "B":
	var Bosses = require("../ressources/bosses/Bosses.json");
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
	    //Spawn map name and additional info if available
	    var fBoss = Bosses[sBoss];
	    var inf = [];
	    if (fBoss.info != null) {
		inf[0] = fBoss.info;
	    } else {
		inf[0] = "No additional info available.";
	    }

	    if (fBoss.spawn != null && fs.statSync(__dirname + "/../ressources/bosses/spawns/" + fBoss.spawn).isFile()) {
		inf[1] = fBoss.spawn;
		inf[2] = fBoss.region==null?fBoss.spawn:fBoss.region;
	    } else {
		inf[1] = null;
		inf[2] = null;
	    }

	    console.log("Info for " + fBoss.name + " is stored in file: " + inf[1]);
	    return inf;
	}
    }
}

var geti = {};

geti.args = "<mode> <name>";
geti.help = "Modes are: B - get Info about a Boss and its spawn locations.";
geti.notservers = ["Ryzom Karavan"];
geti.main = (bot, msg) => {
    if (msg.channel.server.name == "Ryzom Karavan") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
        var aArg = msg.content.split(' ');
	if (aArg.length > 4) {
	    bot.sendMessage(msg.channel, "Too many Arguments. Use:```xl\n/getInf B Boss     'gives info and map of spawns for Boss'\n```");
	} else if (aArg.length == 4) {
	    if (aArg[2] == "B") {
		var info = getInfo(aArg[2], aArg[3]);
		bot.sendMessage(msg.channel, info[0]);
		if (info[1] != null)
		    bot.sendFile(msg.channel, __dirname + "/../ressources/bosses/spawns/" + info[1], info[2]);
	    } else {
		bot.sendMessage(msg.channel, "Unknown mode: " + aArg[2] + ". Use:```xl\n/getInf B Boss     'gives info and map of spawns for Boss'\n```");
	    }
	} else {
	    bot.sendMessage(msg.channel, "Not enough Arguments. Use:```xl\n/getInf B Boss     'gives info and map of spawns for Boss'\n```");
	}
    }
}
module.exports = geti;
