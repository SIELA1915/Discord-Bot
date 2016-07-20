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
	
	switch(Object){
	case "Light Armor":
	case "LA":
	case "Light":
	case "Medium Armor":
	case "MA":
	case "Medium":
	case "Heavy Armor":
	case "HA":
	case "Heavy":
	    if (cArmor >= Quality) inf.push(cChar["name"]);
	    break;	
	case "Big Shield":
	case "Shield":
	case "Small Shield":
	case "Buckler":
	    if (cShields >= Quality) inf.push(cChar["name"]);
	    break;
	case "Jewelry":
	case "Joolz":
	case "Jools":
	case "Jewels":
	    if (cJewels >= Quality) inf.push(cChar["name"]);
	    break;
	case "Melee Weapons":
	case "Tank":
	case "Melee":
	case "2H":
	case "1H":
	case "Magic Amplifiers":
	case "Amps":
	    if (cMelee >= Quality) inf.push(cChar["name"]);
	    break;
	case "Range Weapons":
	case "Ranged Weapons":
	case "Range":
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
	    var q = aArg[2];
	    var crafters = getCrafter(q, obj);
	    if (crafters.length > 1) {
		bot.sendMessage(msg.channel, crafters.slice(1).join(", ") + " can craft q" + q + " " + obj + " for you.");
	    } else if (crafters[0] == 1) {
		bot.sendMessage(msg.channel, "I do not have knowledge of any crafter that can craft q" + q + " " + obj + " for you.");
	    } else {
		bot.sendMessage(msg.channel, "I do not know what " + obj + " is.");
	    }
	    var glo = require("../globalFuncs.js")();
	    glo.updateAPI([rChar], false);
	} else {
	    bot.sendMessage(msg.channel, "Not enough Arguments. " + help);
	}
    }
}
module.exports = getc;
