var fs = require("fs");

function getCrafter(Quality, Object) {
    var inf = [1];
    var c = require("../ressources/ryzomapi/Characters.json");

    for (var cha in c) {
	if (inf[0] == 0) break;
	var cChar = c[cha]["ryzomapi"]["character"];
	var skills = cChar["skills"];
	var armor = -1;
	var shield = -1;
	var jewels = -1;
	var melee = -1;
	var range = -1;
	
	for (var s in skills) {
	    skills[s] = parseInt(skills[s]);
	    if (s == "sc") {
		if (skills[s] > armor) armor = skills[s];
		if (skills[s] > shield) shield = skills[s];
		if (skills[s] > jewels) jewels = skills[s];
		if (skills[s] > melee) melee = skills[s];
		if (skills[s] > range) range = skills[s];
	    } else if (s == "sca") {
		if (skills[s] > armor) armor = skills[s];
		if (skills[s] > shield) shield = skills[s];
	    } else if (s.includes("scal") || s.includes("scam") || s.includes("scah")) {
		if (skills[s] > armor) armor = skills[s];
	    } else if (s.includes("scas")) {
		if (skills[s] > shield) shield = skills[s];
		if (skills[s] > armor) armor = skills[s];
	    } else if (s.includes("scj")) {
		if (skills[s] > jewels) jewels = skills[s];
	    } else if (s.includes("scm")) {
		if (skills[s] > melee) melee = skills[s];
	    } else if (s.includes("scr")) {
		if (skills[s] > range) range = skills[s];
	    }
	}
	var cArmor = Math.floor(armor/10)*10+10;
	var cShields = Math.floor(shield/10)*10+10;
	var cJewels = Math.floor(jewels/10)*10+10;
	var cMelee = Math.floor(melee/10)*10+10;
	var cRange = Math.floor(range/10)*10+10;
	
	switch(Object.toLowerCase()){
	case "light armor":
	case "la":
	case "light":
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

getcrafter.args = '<quality> <object>';
getcrafter.help = 'Gives you a list of registered crafters that can craft specified object in specified quality for you.';
getcrafter.notservers = [ 'Ryzom Karavan' ];
getcrafter.main = (bot, msg, channel) => {
	var help = "Please specify a quality and an object to get a crafter for.";
        var aArg = msg.content.split(' ');
	if (aArg.length >= 4) {
//	    var rChar = require("../ressources/ryzomapi/Char_Map.json");
	    var obj = aArg.slice(3).join(" ");
	    var q = aArg[2].replace(/\D/g, '');
	    var crafters = getCrafter(q, obj);
	    if (crafters.length > 1) {
		channel.sendMessage(crafters.slice(2).join(", ") + " and " + crafters[1] + " can craft q" + q + " " + obj + " for you.");
	    } else if (crafters[0] == 1) {
		channel.sendMessage("I do not have knowledge of any crafter that can craft q" + q + " " + obj + " for you.");
	    } else {
		channel.sendMessage("I do not know what " + obj + " is.");
	    }
//	    updateAPI([rChar], false);
	} else {
	    channel.sendMessage("Not enough Arguments. " + help);
	}
} 
