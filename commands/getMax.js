var fs = require("fs");

function getMax(User, Object) {
    var inf = [];
    var c = require("../ressources/ryzomapi/Characters.json");
    var cChar = c[User]["ryzomapi"]["character"];
    var highest = 0;
    var characs = cChar["characteristics"];
    var skills = cChar["skills"];
    for (var s in skills) {
	if (parseInt(skills[s]) > highest) highest = parseInt(skills[s]);
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
	inf[0] = (highest+25)-(parseInt(characs["constitution"])*1.5)<0?highest+25:parseInt(characs["constitution"])*1.5;
	break;
    case "Heavy Armor":
    case "HA":
    case "Heavy":
	inf[0] = (highest+25)-(parseInt(characs["constitution"])+10)<0?highest+25:parseInt(characs["constitution"])+10;
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
	inf[0] = parseInt(characs["strength"])+10;
	break;
    case "Range Weapons":
    case "Ranged Weapons":
    case "Range":
	inf[0] = parseInt(characs["wellbalanced"])+10;
	break;
    case "Magic Amplifiers":
    case "Amps":
	inf[0] = parseInt(characs["intelligence"])+10;
	break;
    case "Big Shield":
    case "Shield":
	inf[0] = parseInt(characs["constitution"])+10;
	break;
    case "Small Shield":
    case "Buckler":
	inf[0] = (highest+25)-(parseInt(characs["constitution"])*1.5)<0?highest+25:parseInt(characs["constitution"])*1.5;
	break;
    default:
	break;
    }
    return inf;
}

var getm = {};

getm.args = "<object>";
getm.help = "Gives you the highest quality you can wear of specified item.";
getm.notservers = ["Ryzom Karavan"];
getm.main = (bot, msg) => {
    if (msg.channel.isPrivate || msg.channel.server.id == "175308871122812929") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	var help = "Please specify an object to get the highest quality for.";
        var aArg = msg.content.split(' ');
	if (aArg.length >= 3) {
	    var rChar = require("../ressources/ryzomapi/Char_Map.json")[msg.author.id];
	    var obj = aArg.slice(2).join(" ");
	    var q = getMax(rChar, obj);
	    if (q[0] != null) {
		bot.sendMessage(msg.channel, "You can wear " + obj + " of quality: " + q[0]);
	    } else {
		bot.sendMessage(msg.channel, "Object " + obj + " wasn't found");
	    }
	    var glo = require("../globalFuncs.js")();
	    glo.updateAPI([rChar], false);
	} else {
	    bot.sendMessage(msg.channel, "Not enough Arguments. " + help);
	}
    }
}
module.exports = getm;
