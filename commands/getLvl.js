var fs = require("fs");

function getSmallBlock(code, skills) {
    var cCode = code;

    while (skills[cCode] == null) cCode = cCode.left(cCode.length-1);

    return skills[cCode];
}

function getLvl(User, Branch) {
    var inf = [];
    let c = require("../ressources/ryzomapi/Characters.json")[User];
    let skills = c["skills"];
	
    switch(Object.toLowerCase()){
    case "craft":
	inf[0] = getSmallBlock("sc", skills);
	break;
    case "la":
    case "light":
    case "light armor":
	
	case "medium armor":
	case "ma":
	case "medium":
	case "heavy armor":
	case "ha":
	case "heavy":
	    if (cArmor >= Quality) inf.push(cChar["name"]);
	    break;	
	case "big shield":
	case "shield":
	case "small shield":
	case "buckler":
	    if (cShields >= Quality) inf.push(cChar["name"]);
	    break;
	case "jewelry":
	case "joolz":
	case "jools":
	case "jewels":
	    if (cJewels >= Quality) inf.push(cChar["name"]);
	    break;
	case "melee weapons":
	case "tank":
	case "melee":
	case "2h":
	case "1h":
	case "long axe":
	case "long mace":
	case "long sword":
	case "pike":
	case "axe":
	case "mace":
	case "sword":
	case "lance":
	case "spear":
	case "dagger":
	case "staff":
	case "magic amplifiers":
	case "amps":
	    if (cMelee >= Quality) inf.push(cChar["name"]);
	    break;
	case "range weapons":
	case "ranged weapons":
	case "range":
	case "pistol":
	case "revolver":
	case "gun":
	case "rifle":
	case "bowpistol":
	case "bowrifle":
	case "al":
	case "autolauncher":
	case "launcher":
	    if (cRange >= Quality) inf.push(cChar["name"]);
	    break;
	default:
	    inf[0] = 0;
	    break;
	}
    }
    return inf;
}

var getc = {};

getc.args = "<quality> <object>";
getc.help = "Gives you a list of registered crafters that can craft specified object in specified quality for you.";
getc.notservers = ["Ryzom Karavan"];
getc.main = (bot, msg) => {
    if (msg.channel.isPrivate || msg.channel.server.id == "175308871122812929") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	var help = "Please specify a quality and an object to get a crafter for.";
        var aArg = msg.content.split(' ');
	if (aArg.length >= 4) {
//	    var rChar = require("../ressources/ryzomapi/Char_Map.json");
	    var obj = aArg.slice(3).join(" ");
	    var q = aArg[2].replace(/\D/g, '');
	    var crafters = getCrafter(q, obj);
	    if (crafters.length > 1) {
		bot.sendMessage(msg.channel, crafters.slice(1).join(", ") + " can craft q" + q + " " + obj + " for you.");
	    } else if (crafters[0] == 1) {
		bot.sendMessage(msg.channel, "I do not have knowledge of any crafter that can craft q" + q + " " + obj + " for you.");
	    } else {
		bot.sendMessage(msg.channel, "I do not know what " + obj + " is.");
	    }
	    updateAPI([rChar], false);
	} else {
	    bot.sendMessage(msg.channel, "Not enough Arguments. " + help);
	}
    }
}
module.exports = getc;
