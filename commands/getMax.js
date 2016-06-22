var fs = require("fs");

function getMax(User, Object) {
    var inf = [];
    var c = require("../ressources/ryzomapi/Characters.json");
    var cChar = c[User]["ryzomapi"]["character"][0];
    var highest = 0;
    var characs = cChar["characteristics"];
    var skills = cChar["skills"];
    for (var s in skills) {
	if (skills[s] > highest) highest = skills[s];
    }
    switch(Object){
    case "Light Armor":
    case "LA":
    case "Light":
	    inf[0] = highest + 25;
	    break;
    case "Medium Armor":
    case "MA":
    case "Medium":
	inf[0] = (highest+25)-(characs["constitution"]*1.5)>0?highest+25:characs["constitution"]*1.5;
	    break;
    case "Heavy Armor":
    case "HA":
    case "Heavy":
	inf[0] = (highest+25)-(characs["constitution"]+10)>0?highest+25:characs["constitution"]+10;
	    break;	
    case "Jewelry":
    case "Joolz":
    case "Jools":
    case "Jewels":
	inf[0] = highest+25;
	break;
    case "Melee Weapons":
    case "Tank":
    case "Melee":
    case "2H":
    case "1H":
	inf[0] = characs["strength"]+10;
	break;
    case "Range Weapons":
    case "Ranged Weapons":
    case "Range":
	inf[0] = characs["balance"]+10;
	break;
    case "Magic Amplifiers":
    case "Amps":
	inf[0] = characs["intelligence"]+10;
	break;
    case "Big Shield":
    case "Shield":
	inf[0] = characs["constitution"]+10;
    case "Small Shield":
    case "Buckler":
	inf[0] = characs["constitution"]*1.5;
    default:
	break;
    }
    if (inf[2] != null && !inf[2].endsWith(".png")) inf[2] += ".png";
    return inf;
}

var getm = {};

getm.args = "<object>";
getm.help = "Gives you the highest quality you can wear of specified item.";
getm.notservers = ["Ryzom Karavan"];
getm.main = (bot, msg) => {
    if (msg.channel.server.name == "Ryzom Karavan") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	var help = "Please specify an object to get the highest quality for.";
        var aArg = msg.content.split(' ');
	if (aArg.length >= 3) {
	    var glo = require("../globalFuncs.js")();
	    var rChar = require("../ressources/ryzomapi/Char_Map.json")[msg.author.id];
	    glo.updateAPI(rChar, false);
	    var obj = aArg.slice(2).join(" ");
	    var q = getMax(rChar, obj);
	    if (q[0] != null) {
		bot.sendMessage(msg.channel, "You can wear " + obj + " of quality: " + info[0]);
	    } else {
		bot.sendMessage(msg.channel, "Object " + obj + " wasn't found");
	    }
	} else {
	    bot.sendMessage(msg.channel, "Not enough Arguments. " + help);
	}
    }
}
module.exports = getm;
