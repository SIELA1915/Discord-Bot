//Create announcement for War in English
function WarToEn(War) {
    var sWar = "[EN]\n";
    var month_en = new Array("January", "February", "March", 
			     "April", "May", "June", "July", "August", "September", 
			     "October", "November", "December");
    var sup = "";
    if (War.day == 1 || War.day == 21 || War.day ==31)
    {
	sup = "st";
    }
    else if (War.day == 2 || War.day == 22)
    {
	sup = "nd";
    }
    else if (War.day == 3 || War.day == 23)
    {
	sup = "rd";
    }
    else
    {
	sup = "th";
    }

    var Outposts = require("../ressources/outposts/Outposts.json");

    // Composing War Announcement
    if (War.help == 0) sWar += "Handover!!\n";
    sWar += War.day;
    sWar += sup;
    sWar += " ";
    sWar += month_en[War.month-1];
    sWar += ", ";
    if (War.hour < 10) sWar += "0";
    sWar += War.hour;
    sWar += ":";
    sWar += War.minute;
    if (War.minute < 10) sWar += "0";
    sWar += " UTC: ";
    sWar += War.attacker;
    sWar += " (";
    sWar += War.attF;
    sWar += ") has declared on ";
    sWar += Outposts[War.op].owner;
    sWar += " (";
    sWar += Outposts[War.op].fac;
    sWar += ") at ";
    sWar += Outposts[War.op].en;
    sWar += " in ";
    sWar += Outposts[War.op].loc_en;

    return sWar;
}

function WarToFr(War) {
    var sWar = "[FR]\n";
    var month_en = new Array("janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre");

    var Outposts = require("../ressources/outposts/Outposts.json");

    // Composing War Announcement
    if (War.help == 0) sWar += "Transfert!!\n";
    sWar += War.day;
    sWar += " ";
    sWar += month_en[War.month-1];
    sWar += ", ";
    if (War.hour < 10) sWar += "0";
    sWar += War.hour;
    sWar += ":";
    sWar += War.minute;
    if (War.minute < 10) sWar += "0";
    sWar += " UTC: ";
    sWar += War.attacker;
    sWar += " (";
    sWar += War.attF;
    sWar += ") a déclaré sur ";
    sWar += Outposts[War.op].owner;
    sWar += " (";
    sWar += Outposts[War.op].fac;
    sWar += ") à ";
    sWar += Outposts[War.op].fr;
    sWar += " dans ";
    sWar += Outposts[War.op].loc_fr;

    return sWar;
}

function WarToDe(War) {
    var sWar = "[DE]\n";
    var month_en = new Array("Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember");

    var Outposts = require("../ressources/outposts/Outposts.json");

    // Composing War Announcement
    if (War.help == 0) sWar += "Übergabe!!\n";
    sWar += War.day;
    sWar += ". ";
    sWar += month_en[War.month-1];
    sWar += ", ";
    if (War.hour < 10) sWar += "0";
    sWar += War.hour;
    sWar += ":";
    sWar += War.minute;
    if (War.minute < 10) sWar += "0";
    sWar += " UTC: ";
    sWar += War.attacker;
    sWar += " (";
    sWar += War.attF;
    sWar += ") greift ";
    sWar += Outposts[War.op].owner;
    sWar += " (";
    sWar += Outposts[War.op].fac;
    sWar += ") beim ";
    sWar += Outposts[War.op].de;
    sWar += " in ";
    sWar += Outposts[War.op].loc_de;
    sWar += " an.";

    return sWar;
}

wars.args = '';
wars.help = 'Shows you all upcoming op wars. Annoucnements in English, French and German.';
wars.notservers = [];
wars.main = (bot, msg, channel) => {
    updateWars();
    var Wars = require("../ressources/outposts/Wars.json");
    if (Wars.length == 0) {
	channel.sendMessage("No Upcoming OP Wars");
    } else {
	for (var War in Wars) {
	    channel.sendMessage(WarToEn(Wars[War]) + "\n" + WarToFr(Wars[War]) + "\n" + WarToDe(Wars[War]));
	}
    }
} 
