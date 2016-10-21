var fs = require("fs");

function getInfo(Mode, Subject) {
    var inf = [];
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

	//Spawn map name and additional info if available
	var fBoss = Bosses[sBoss];
	if (fBoss.info != null) {
	    inf[0] = fBoss.info;
	}
	try{
	    if (fBoss.spawn != null && fs.statSync(__dirname + "/../ressources/bosses/spawns/" + fBoss.spawn).isFile()) {
		inf[1] = __dirname + "/../ressources/bosses/spawns/" + fBoss.spawn;
		inf[2] = fBoss.region==null?fBoss.spawn:fBoss.region;
	    }
	} catch(e) {

	}
	console.log("Info for " + fBoss.name + " is stored in file: " + inf[1]);
	break;
    case "L":
	switch(Subject){
	case "Verdant Heights":
	case "Matis":
	case "Forest":
	    var infoText = __dirname + "/../ressources/regions/info/vh.txt";
	    try {
		if (fs.statSync(infoText).isFile()) {
		    inf[0] = fs.readFileSync(infoText, "utf8");
		}
	    } catch(e) {
		
	    }
	    var pic = __dirname + "/../ressources/regions/map/vh.png";
	    try {
		if (fs.statSync(pic).isFile()) {
		    inf[1] = pic;
		    inf[2] = Subject;
		}
	    } catch(e) {
		
	    }
	    break;
	case "Aeden Aqueous":
	case "Tryker":
	case "Lakes":
	    var infoText = __dirname + "/../ressources/regions/info/aa.txt";
	    try {
		if (fs.statSync(infoText).isFile()) {
		    inf[0] = fs.readFileSync(infoText, "utf8");
		}
	    } catch(e) {
		
	    }
	    var pic = __dirname + "/../ressources/regions/map/aa.png";
	    try {
		if (fs.statSync(pic).isFile()) {
		    inf[1] = pic;
		    inf[2] = Subject;
		}
	    } catch(e) {
		
	    }
	    break;
	case "Witherings":
	case "Zorai":
	case "Jungle":
	    var infoText = __dirname + "/../ressources/regions/info/wi.txt";
	    try {
		if (fs.statSync(infoText).isFile()) {
		    inf[0] = fs.readFileSync(infoText, "utf8");
		}
	    } catch(e) {
		
	    }
	    var pic = __dirname + "/../ressources/regions/map/wi.png";
	    try {
		if (fs.statSync(pic).isFile()) {
		    inf[1] = pic;
		    inf[2] = Subject;
		}
	    } catch(e) {
		
	    }
	    break;
	case "Burning Desert":
	case "Fyros":
	case "Desert":
	    var infoText = __dirname + "/../ressources/regions/info/bd.txt";
	    try {
		if (fs.statSync(infoText).isFile()) {
		    inf[0] = fs.readFileSync(infoText, "utf8");
		}
	    } catch(e) {
		
	    }
	    var pic = __dirname + "/../ressources/regions/map/bd.png";
	    try {
		if (fs.statSync(pic).isFile()) {
		    inf[1] = pic;
		    inf[2] = Subject;
		}
	    } catch(e) {
		
	    }
	    break;
	case "Nexus":
	    var infoText = __dirname + "/../ressources/regions/info/ne.txt";
	    try {
		if (fs.statSync(infoText).isFile()) {
		    inf[0] = fs.readFileSync(infoText, "utf8");
		}
	    } catch(e) {
		
	    }
	    var pic = __dirname + "/../ressources/regions/map/ne.png";
	    try {
		if (fs.statSync(pic).isFile()) {
		    inf[1] = pic;
		    inf[2] = Subject;
		}
	    } catch(e) {
		
	    }
	    break;
	case "Wastelands":
	    var infoText = __dirname + "/../ressources/regions/info/wl.txt";
	    try {
		if (fs.statSync(infoText).isFile()) {
		    inf[0] = fs.readFileSync(infoText, "utf8");
		}
	    } catch(e) {
		
	    }
	    var pic = __dirname + "/../ressources/regions/map/wl.png";
	    try {
		if (fs.statSync(pic).isFile()) {
		    inf[1] = pic;
		    inf[2] = Subject;
		}
	    } catch(e) {
		
	    }
	    break;
	default:
	    break;
	}
	break;
    case "G":
	switch(Subject){
	case "bossmacro":
	case "boss macro":
	    var infoText = __dirname + "/../ressources/general/info/bossmacro.txt";
	    try {
		if (fs.statSync(infoText).isFile()) {
		    inf[0] = fs.readFileSync(infoText, "utf8");
		}
	    } catch(e) {}

	    var data = __dirname + "/../ressources/general/data/bossmacro.txt";
	    try {
		if (fs.statSync(data).isFile()) {
		    inf[1] = data;
		    inf[2] = "Boss Macro.txt";
		}
	    } catch(e) {}
	    break;
	default:
	    break;
	}
    default:
	break;
    }
    if (inf[2] != null && !inf[2].endsWith(".png")) inf[2] += ".png";
    return inf;
}

getinf.args = '<mode> <name>';
getinf.help = 'Modes are: \nB - get Info about a Boss and its spawn locations.\nL - get Info about a Region and spawn locations for Bosses in it';
getinf.notservers = [ 'Ryzom Karavan' ];
getinf.main = (bot, msg, channel) => {
    var help = "Use: ```xl\n/amee getInf B Boss     'gives info and map of spawns for Boss'\n/amee getInf L Land     'gives info and map of spawns for region'\n```";
    var aArg = msg.content.split(' ');
    if (aArg.length >= 4) {
	if (aArg[2] == "B" || aArg[2] == "L" || aArg[2] == "G") {
	    var info = getInfo(aArg[2], aArg.slice(3).join(" "));
	    if (info[0] != null)
		channel.sendMessage(info[0]);
	    if (info[1] != null)
		channel.sendFile(info[1], info[2]);
	} else {
	    channel.sendMessage("Unknown mode: " + aArg[2] + ". " + help);
	}
    } else {
	channel.sendMessage("Not enough Arguments. " + help);
    }   
} 
