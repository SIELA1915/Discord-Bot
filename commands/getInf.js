var fs = require("fs");

function getInfo(Mode, Subject) {
    console.log(Mode + " " + Subject);
    switch (Mode) {
    case "B":
	var Bosses = require("../ressources/bosses/Bosses.json");
	//Find corresponding Boss
	var sBoss = 0;
	var found = 0;
	for (var BOSS in Bosses) {
	    var cBoss = Bosses[BOSS];
	    console.log("Boss: " + Subject +  " cBoss.name: " + cBoss.name + " cBoss.time: " + cBoss.time);
	    if (cBoss.name == Subject) {
		sBoss = BOSS;
		found = 1;
		break;
	    }
	}

	if (!found) {
	    console.log("Couldn't find Boss called: " + Subject);
	    return "Couldn't find Boss called: " + Subject;
	} else {
	    //Spawn map name and additional info if available
	    var fBoss = Bosses[sBoss];
	    var inf = [];
	    if (fBoss.info != null) {
		inf[0] = fBoss.info;
	    }

	    if (fBoss.spawn != null && fs.statSync(__dirname + "/../ressources/bosses/spawns/" + fBoss.spawn).isFile()) {
		inf[1] = __dirname + "/../ressources/bosses/spawns/" + fBoss.spawn;
		inf[2] = fBoss.region==null?fBoss.spawn:fBoss.region;
	    }

	    console.log("Info for " + fBoss.name + " is stored in file: " + inf[1]);
	    return inf;
	}
	break;
    case "L":
	var inf = [];
	switch(Subject){
	case "Verdant Heights":
	case "Matis":
	case "Forest":
	    var infoText = __dirname + "/../ressources/regions/info/vh.txt";
	    if (fs.statSync(infoText).isFile()) {
		inf[0] = fs.readFileSync(infoText, "utf8");
	    }
	    var pic = __dirname + "/../ressources/regions/map/vh.png";
	    if (fs.statSync(pic).isFile()) {
		inf[1] = pic;
		inf[2] = Subject;
	    }
	    break;
	case "Aeden Aqueous":
	case "Tryker":
	case "Lakes":
	    var infoText = __dirname + "/../ressources/regions/info/aa.txt";
	    if (fs.statSync(infoText).isFile()) {
		inf[0] = fs.readFileSync(infoText, "utf8");
	    }
	    var pic = __dirname + "/../ressources/regions/map/aa.png";
	    if (fs.statSync(pic).isFile()) {
		inf[1] = pic;
		inf[2] = Subject;
	    }
	    break;
	case "Witherings":
	case "Zorai":
	case "Jungle":
	    var infoText = __dirname + "/../ressources/regions/info/wi.txt";
	    if (fs.statSync(infoText).isFile()) {
		inf[0] = fs.readFileSync(infoText, "utf8");
	    }
	    var pic = __dirname + "/../ressources/regions/map/wi.png";
	    if (fs.statSync(pic).isFile()) {
		inf[1] = pic;
		inf[2] = Subject;
	    }
	    break;
	case "Burning Desert":
	case "Fyros":
	case "Desert":
	    var infoText = __dirname + "/../ressources/regions/info/bd.txt";
	    if (fs.statSync(infoText).isFile()) {
		inf[0] = fs.readFileSync(infoText, "utf8");
	    }
	    var pic = __dirname + "/../ressources/regions/map/bd.png";
	    if (fs.statSync(pic).isFile()) {
		inf[1] = pic;
		inf[2] = Subject;
	    }
	    break;
	case "Nexus":
	    var infoText = __dirname + "/../ressources/regions/info/ne.txt";
	    if (fs.statSync(infoText).isFile()) {
		inf[0] = fs.readFileSync(infoText, "utf8");
	    }
	    var pic = __dirname + "/../ressources/regions/map/ne.png";
	    if (fs.statSync(pic).isFile()) {
		inf[1] = pic;
		inf[2] = Subject;
	    }
	    break;
	case "Wastelands":
	    var infoText = __dirname + "/../ressources/regions/info/wl.txt";
	    if (fs.statSync(infoText).isFile()) {
		inf[0] = fs.readFileSync(infoText, "utf8");
	    }
	    var pic = __dirname + "/../ressources/regions/map/wl.png";
	    if (fs.statSync(pic).isFile()) {
		inf[1] = pic;
		inf[2] = Subject;
	    }
	    break;
	}
	return inf;
    }
}

var geti = {};

geti.args = "<mode> <name>";
geti.help = "Modes are: \nB - get Info about a Boss and its spawn locations.\nL - get Info about a Region and spawn locations for Bosses in it";
geti.notservers = ["Ryzom Karavan"];
geti.main = (bot, msg) => {
    if (msg.channel.server.name == "Ryzom Karavan") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	var help = "Use: ```xl\n/amee getInf B Boss     'gives info and map of spawns for Boss'\n/amee getInf L Land     'gives info and map of spawns for region'\n```";
        var aArg = msg.content.split(' ');
	if (aArg.length >= 4) {
	    if (aArg[2] == "B" || aArg[2] == "L") {
		var info = getInfo(aArg[2], aArg.slice(3).join(" "));
		if (info[0] != null)
		    bot.sendMessage(msg.channel, info[0]);
		if (info[1] != null)
		    bot.sendFile(msg.channel, info[1], info[2]);
	    } else {
		bot.sendMessage(msg.channel, "Unknown mode: " + aArg[2] + ". " + help);
	    }
	} else {
	    bot.sendMessage(msg.channel, "Not enough Arguments. " + help);
	}
    }
}
module.exports = geti;
