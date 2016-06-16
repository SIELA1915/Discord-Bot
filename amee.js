#!/usr/bin/env node

var fs = require("fs");

function timeToGo(d) {

    // Utility to add leading zero
    function z(n) {
	return (n < 10? '0' : '') + n;
    }

    // Convert string to date object
    var diff = d - new Date();

    // Allow for previous times
    var sign = diff < 0? -1 : 1;
    diff = Math.abs(diff);

    // Get time components
    var hours = diff/3.6e6 | 0;
    var mins  = diff%3.6e6 / 6e4 | 0;
    var secs  = Math.round(diff%6e4 / 1e3);

    // Return array
    return [z(hours), z(mins), z(secs), sign];
}

//Structure for an Outpost
function Outpost(En, Fr, De, Loc_en, Loc_fr, Loc_de, Prod, Qual, Owner, Faction) {
    this.en = En;
    this.fr = Fr;
    this.de = De;
    this.loc_en = Loc_en;
    this.loc_fr = Loc_fr;
    this.loc_de = Loc_de;
    this.prod = Prod;
    this.q = Qual;
    this.owner = Owner;
    this.fac = Faction;
};

//Function to create a new War
function NewWar(Prod, Q, Attacker, AttFaction, Help, Minute, Hour, Day, Month) {
    var Outposts = require("./Outposts.json");


    //Find corresponding Outpost
    var Op = 0;
    var found = 0;
    for (var OP in Outposts) {
	var cOP = Outposts[OP];
	console.log("OP: " + OP + " cOP.prod: " + cOP.prod + " cOP.q: " + cOP.q + " Prod: " + Prod + " Q: " + Q);
	if (cOP.prod == Prod && cOP.q == Q) {
	    Op = OP;
	    found = 1;
	    break;
	}
    }

    //Initialize War
    var War = {
	op: Op,
	attacker: Attacker,
	attF: AttFaction,
	help: Help,
	minute: parseInt(Minute),
	hour: parseInt(Hour),
	day: parseInt(Day),
	month: parseInt(Month)
    };
    
    if (!found) {
	console.log("Couldn't find OP that produces " + Prod + " of Quality " + Q);
	return "Couldn't find OP that produces " + Prod + " of Quality " + Q;
    } else {
	//Add War to DB
	var Wars = require("./Wars.json");
	console.log("Added War: " + JSON.stringify(War, null, 2));
	Wars[Wars.length] = War;
	fs.writeFileSync("Wars.json", JSON.stringify(Wars), "utf8");
	return "Added War successfully";
    }
}

//Function to delete Wars that are over
function UpdateWars() {
    var Wars = require("./Wars.json");
    //Set up current time and War end time
    var cTime = new Date();
    cTime.setUTCHours(cTime.getUTCHours());
    for (var War in Wars) {
	var vWar = Wars[War];
	var d = vWar.day;
	console.log(d);
	var wTime = new Date(Date.UTC(cTime.getUTCFullYear(),vWar.month-1,vWar.day,vWar.hour+2,vWar.minute));
	console.log(War);
	console.log(wTime);
	console.log(cTime);
	if (wTime < cTime) {
	    console.log("Deleting War: " + JSON.stringify(vWar, null, 2));
	    Wars.splice(War, 1);
	}
    }
    //Write updated database to file
    fs.writeFileSync("Wars.json", JSON.stringify(Wars), "utf8");
}

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

    var Outposts = require("./Outposts.json");

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

    var Outposts = require("./Outposts.json");

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

    var Outposts = require("./Outposts.json");

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

//Different usages:

/*
  var Outposts = require("./Outposts.json");
  var Wars = require("./Wars.json");

  NewWar("op1", "guild1", "Kami", 30, 19, 5, 5);
  NewWar("op2", "guild1", "Kami", 30, 21, 5, 5);

  UpdateWars();

  for (var War in Wars) {
  console.log(WarToEn(Wars[War]));
  }
*/

function killedBoss(Boss, d) {
    var Bosses = require("./Bosses.json");
    var cTime = d===0?new Date():d;
    //Find corresponding Boss
    var sBoss = 0;
    var found = 0;
    for (var BOSS in Bosses) {
	var cBoss = Bosses[BOSS];
	console.log("Boss: " + Boss + " Time: " + cTime + " cBoss.name: " + cBoss.name + " cBoss.time: " + cBoss.time);
	if (cBoss.name == Boss) {
	    sBoss = BOSS;
	    found = 1;
	    break;
	}
    }
    
    if (!found) {
	console.log("Couldn't find Boss called: " + Boss);
	var sTime = cTime.toUTCString();
	console.log("Added Boss: " + Boss + " to last killed: " + sTime);
	Bosses[Bosses.length] = {"name":Boss, "time":cTime.getTime()};
	fs.writeFileSync("Bosses.json", JSON.stringify(Bosses), "utf8");
	return "Added Boss: " + Boss + " to last killed: " + sTime;
    } else {
	//Update Boss in DB
	var sTime = cTime.toUTCString();
	console.log("Updated Boss: " + Boss + " to last killed: " + sTime);
	Bosses[sBoss].time = cTime.getTime();
	fs.writeFileSync("Bosses.json", JSON.stringify(Bosses), "utf8");
	return "Updated Boss: " + Boss + " to last killed: " + sTime;
    }
}

function getBoss(Boss) {
    var Bosses = require("./Bosses.json");
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
	//Return time killed boss
	var fBoss = Bosses[sBoss];
	var bTime = new Date(fBoss.time);
	bTime.setTime(bTime.getTime() + (48 * 60 * 60 * 1000));
	var tillArr = timeToGo(bTime);
	var next = "";
	if (tillArr[3] < 0) {
	    next = "This Boss might be available!";
	} else {
	    var sTill = tillArr[0] + " Hours " + tillArr[1] + " Minutes " + tillArr[2] + " Seconds";
	    next = "Earliest possible respawn in: " + sTill;
	}
	console.log(fBoss.name + " got last killed: " + fBoss.time + ".          " + next);
	return fBoss.name + " got last killed: " + new Date(fBoss.time).toUTCString() + ".          " + next;
    }
}

function getBosses() {
    var Bosses = require("./Bosses.json");
    //Find corresponding Boss
    var sBoss = [];
    var found = 0;
    for (var BOSS in Bosses) {
	var cBoss = Bosses[BOSS];
	var bTime = new Date(cBoss.time);
	bTime.setTime(bTime.getTime() + (48 * 60 * 60 * 1000));
	var tillArr = timeToGo(bTime);
	if (tillArr[3] < 0) {
	    sBoss[sBoss.length] = BOSS;
	    found = 1;
	    break;
	}
    }

    if (!found) {
	console.log("Couldn't find any possibly spawned boss.");
	return ["Couldn't find any possibly spawned boss."];
    } else {
	//Return all available boss
	var allBosses = [""];
	var ind = 0;
	for (var BOSS in sBoss) {
	    var fBoss = Bosses[sBoss[BOSS]];
	    var next = "";
	    next = "This Boss might be available!";
	    var add = fBoss.name + " got last killed: " + new Date(fBoss.time).toUTCString() + ".          " + next + "\n";
	    console.log(add);
	    if (allBosses[ind].length + add.length > 2000) ++ind;
	    allBosses[ind] += add;
	}
	return allBosses;
    }
}

function sendFile(Amee, channel) {
    Amee.sendFile(channel, "./Bosses.xlsx", "Bosses.xlsx");
}

function JSDateToExcelDate(inDate) {
    var returnDateTime = 25569.0 + ((inDate.getTime() - (inDate.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
    return returnDateTime.toString().substr(0,20);
}

function bossesToExcel(utcOff, Amee, channel) {
    var Bosses = require("./Bosses.json");

    var Excel = require("exceljs");

    var workbook = new Excel.Workbook();

    workbook.creator = "Amee";
    workbook.lastModifiedBy = "Amee";
    workbook.created = new Date(2016, 6, 12);
    workbook.modified = new Date();

    var sheet = workbook.addWorksheet("Bosses");

    var bossSheet = workbook.getWorksheet("Bosses");

    bossSheet.columns = [
	{header:"Boss", key:"name", width:20},
	{header:"Killed", key:"time", width:100, style: {numFmt:"dd/mm/yyyy hh:mm:ss"}},
	{header:"Respawn", key:"until", width:100}
    ];

    for (var BOSS in Bosses) {
        var bTime = new Date(Bosses[BOSS].time + (48 * 60 * 60 * 1000));
	var tillArr = timeToGo(bTime);
	var next = "";
	if (tillArr[3] < 0) {
	    next = "This Boss might be spawned!";
	} else {
	    var sTill = tillArr[0] + " Hours " + tillArr[1] + " Minutes " + tillArr[2] + " Seconds";
	    next = "Might Spawn in: " + sTill;
	}
	var sDate = bTime.toUTCString();
	var fDate = sDate.substring(5,25);
	bossSheet.addRow([Bosses[BOSS].name, new Date(Bosses[BOSS].time), {formula: "IF((DATEVALUE(\"" + fDate + "\")+TIMEVALUE(\"" + fDate + "\"))−(NOW()−(1÷24×" + utcOff + "))<(NOW()-NOW()),\"This Boss might be spawned!\", CONCATENATE(\"Might Spawn in: \", (DATEVALUE(\"" + fDate + "\")+TIMEVALUE(\"" + fDate + "\"))−(NOW()−(1÷24×" + utcOff + "))))", result:next}]);
    }

    workbook.xlsx.writeFile("./Bosses.xlsx").then(function(){
	console.log("done");
	sendFile(Amee, channel);
    });
    
    /*    var excelbuilder = require("msexcel-builder");
    // Create a new workbook file in current working-path
    var workbook = excelbuilder.createWorkbook('./', 'Bosses.xlsx')

    // Create a new worksheet with 10 columns and 12 rows
    var sheet1 = workbook.createSheet('sheet1', 3, Bosses.length);

    // Fill some data
    sheet1.set(1, 1, 'Boss');
    sheet1.set(1, 2, 'Killed');
    sheet1.set(1, 3, 'Respawn');
    for (var i = 2; i < Bosses.length+2; i++) {
	sheet1.set(i, 1, Bosses[i-2].name);
	sheet1.set(i, 2, Bosses[i-2].time);
	sheet1.set(i, 3, "=(" + JSDateToExcelDate(new Date(Bosses[Boss].time)) + "-NOW())*24");
    }
    // Save it
    workbook.save(function(ok){
	if (!ok)
	    workbook.cancel();
	else
	    console.log('congratulations, your workbook created');
    });
*/    /*
    for (var Boss in Bosses) {
	var cBoss = Bosses[Boss];
	Bosses[Boss].next = "=(" + JSDateToExcelDate(new Date(Bosses[Boss].time)) + "-NOW())*24";
    }
    var json2xls = require('json2xls');
    var xls = json2xls(Bosses);

    fs.writeFileSync('Bosses.xlsx', xls, 'binary');
    
    return xls;
    */
}

var Discord = require("discord.js");

var Amee = new Discord.Client();

/*Amee.on("presence", function(oldUser, newUser) {
    if (oldUser.status == "offline" && newUser.status == "online" && Amee.servers.get("name", "Ryzom Karavan").rolesOfUser(newUser).length != 0) {
	Amee.sendMessage(Amee.servers.get("name", "Ryzom Karavan").channels.get("name", "general"), Amee.user.username + " aiye, " + newUser + "!");
    };
});*/

Amee.on("message", function(message) {
    var Wars = require("./Wars.json");
    if (message.content.substring(0, 5) == "/hugs") {
	var Arg = message.content.substring(6, message.content.length);
	if (Arg != "") {
	    if (Amee.users.get("username", Arg) != null) {
		Amee.sendMessage(message.channel, Amee.user.username + " hugs " + Amee.users.get("username", Arg) + "!");
	    } else {
		Amee.sendMessage(message.channel, Amee.user.username + " hugs " + Arg + "!");
	    }
	} else {
	Amee.sendMessage(message.channel, Amee.user.username + " hugs " + message.author);
	}
    } else if (message.content.substring(0, 7) == "/cookie") {
	var mEnd = ", take this cookie as a gift from me.\n               ``_.:::::._\n     .:::'_|_':::.\n    /::' --|-- '::\\ \n   |:\" .---\"---. ':|\n   |: ( O R E O ) :|\n   |:: `-------' ::|\n    \\:::.......:::/\n     ':::::::::::'\n        `'\"\"\"'` ``"
	var Arg = message.content.substring(8, message.content.length);
	if (Arg != "") {
	    if (Amee.users.get("username", Arg) != null) {
	    Amee.sendMessage(message.channel, Amee.user.username + " aiye, " + Amee.users.get("username", Arg) + mEnd);
	    } else {
		Amee.sendMessage(message.channel, Amee.user.username + " aiye, " + Arg + mEnd);
	    }
	} else {
	    Amee.sendMessage(message.channel, Amee.user.username + " aiye, " + message.author + mEnd);
	}
    } else if (message.content.substring(0, 5) == "/milk") {
	var mEnd = "! Here you have some milk and cookies as a gift from me!\n                                                                      ``.-'''''-.\n                               |'-----'|\n                               |-.....-|\n                               |       |\n                               |       |\n              _,._             |       |\n         __.o`   o`\"-.         |       |\n      .-O o `\"-.o   O )_,._    |       |\n     ( o   O  o )--.-\"`O   o\"-.`'-----'`\n      '--------'  (   o  O    o)  \n                   `----------` ``";
	var Arg = message.content.substring(6, message.content.length);
	if (Arg != "") {
	    if (Amee.users.get("username", Arg) != null) {
	    Amee.sendMessage(message.channel, Amee.user.username + " aiye, " + Amee.users.get("username", Arg) + mEnd);
	    } else {
		Amee.sendMessage(message.channel, Amee.user.username + " aiye, " + Arg + mEnd);
	    }
	} else {
	    Amee.sendMessage(message.channel, Amee.user.username + " aiye, " + message.author + mEnd);
	}
    }  else if (message.content.substring(0, 7) == "/coffee") {
	console.log("giving out coffee");
	var mEnd = "! Here you have some coffee as a gift from me!\n   ( (\n    ) )\n  ..............\n  |           |]\n  \\         /\n    `----'";
	var Arg = message.content.substring(8, message.content.length);
	if (Arg != "") {
	    if (Amee.users.get("username", Arg) != null) {
	    Amee.sendMessage(message.channel, Amee.user.username + " aiye, " + Amee.users.get("username", Arg) + mEnd);
	    } else {
		Amee.sendMessage(message.channel, Amee.user.username + " aiye, " + Arg + mEnd);
	    }
	} else {
	    Amee.sendMessage(message.channel, Amee.user.username + " aiye, " + message.author + mEnd);
	}
    } else if (message.content.substring(0, 5) == "/wars") {
	UpdateWars();
	console.log(Wars.length);
	if (Wars.length == 0) {
	    Amee.sendMessage(message.channel, "No Upcoming OP Wars");
	} else {
	    for (var War in Wars) {
		console.log(Wars[War]);
		Amee.sendMessage(message.channel, WarToEn(Wars[War]) + "\n" + WarToFr(Wars[War]) + "\n" + WarToDe(Wars[War]));
	    }
	}
    } else if (message.content.substring(0, 7) == "/newWar") {
	UpdateWars();
	var sArg = message.content.substring(8, message.content.length);
	var aArg = sArg.split(';');

	if (aArg.length != 9) {
	    Amee.sendMessage(message.channel, "Wrong Format! Please enter following Info (seperated by semicolons ';' and without any spaces except after the /newWar) in this order:\nProduct of the Op; Quality; Attacker Guild; Attacker Faction; Help (0 = Handover); Month; Day; Hours; Minutes");
	} else {
	    var Prod = aArg[0];
	    var Q = aArg[1];
	    var Attacker = aArg[2];
	    var AttFaction = aArg[3];
	    var Help = aArg[4];
	    var Month = aArg[5];
	    var Day = aArg[6];
	    var Hour = aArg[7];
	    var Minute = aArg[8];

	    var success = NewWar(Prod, Q, Attacker, AttFaction, Help, Minute, Hour, Day, Month);
	    Amee.sendMessage(message.channel, success);
	}
    } else if (message.content.substring(0, 4) == "/ops") {
	var Outposts = require("./Outposts.json");
	console.log(JSON.stringify(Outposts, null, 2));
	Amee.sendMessage(message.channel, JSON.stringify(Outposts, null, 2));
    } else if (message.content.substring(0, 11) == "/killedBoss") {
	if (message.channel.server.name == "Ryzom Karavan") {
	    Amee.sendMessage(message.channel, "This functionality isn't available.");
	} else{
	    
	    var sArg = message.content.substring(12, message.content.length);
	    var aArg = sArg.split(' ');
	    if (aArg.length > 2) {
                Amee.sendMessage(message.channel, "Too many Arguments. Use either:\n/killedBoss Boss     -     registers kill for Boss at current time\n/killedBoss Boss ISOTimeStamp     -     registers kill for Boss at ISOTimeStamp\nCurrent ISO Timestamp: " + new Date().toISOString());
	    } else if (aArg.length == 2) {
		Amee.sendMessage(message.channel, killedBoss(aArg[0], new Date(aArg[1])));
	    } else if (aArg.length == 1 && aArg[0] != "") {
		Amee.sendMessage(message.channel, killedBoss(aArg[0], 0));
	    } else {
		Amee.sendMessage(message.channel, "Not enough Arguments. Use either:\n/killedBoss Boss     -     registers kill for Boss at current time\n/killedBoss Boss ISOTimeStamp     -     registers kill for Boss at ISOTimeStamp\nCurrent ISO Timestamp: " + new Date().toISOString());
	    }
	}
    } else if (message.content.substring(0, 8) == "/getBoss") {
        if (message.channel.server.name == "Ryzom Karavan") {
	    Amee.sendMessage(message.channel, "This functionality isn't available.");
	} else {
	    var sArg = message.content.substring(9, message.content.length);
            var aArg = sArg.split(' ');
	    if (aArg.length > 1) {
		Amee.sendMessage(message.channel, "Too many Arguments. Use either:\n/getBoss Boss     -     gets last kill and earliest respawn for Boss\n/getBoss *     -     gets all Bosses that could currently be spawned");
	    } else if (aArg.length == 1 && aArg[0] != "") {
		if (aArg[0] == "*") {
		    var bosses = getBosses();
		    for (var port in bosses) {
			Amee.sendMessage(message.channel, bosses[port]);
		    }
		} else {
		    Amee.sendMessage(message.channel, getBoss(aArg[0]));
		}
	    } else {
		Amee.sendMessage(message.channel, "Not enough Arguments. Use either:\n/getBoss Boss     -     gets last kill and earliest respawn for Boss\n/getBoss *     -     gets all Bosses that could currently be spawned");
	    }
	}
    } else if (message.content.substring(0, 8) == "/xlsBoss") {
	if (message.channel.server.name == "Ryzom Karavan") {
	    Amee.sendMessage(message.channel, "This functionality isn't available.");
	} else{
	    var Arg = message.content.substring(9, message.content.length);
	    if (Arg == "") Arg = 0;
	    bossesToExcel(Arg, Amee, message.channel);
	}
    }
});

Amee.on("serverNewMember", function(server, user) {
    Amee.sendMessage(Amee.servers.get("name", "Ryzom Karavan").channels.get("name", "verification"), Amee.user.username + " Aiye, my follower! Welcome to the Ryzom Karavan Discord Server! Please leave a message with @Administrators, telling your in-game name and which Guild you're in, so we can ensure that no spies have access to our server.");
});

Amee.on("ready", function() {
    console.log("Ready to use");
    Amee.setStatus("online", "watching over Atys");
});

Amee.loginWithToken("MTc4NTkwMjYyMTQ5MzgyMTQ0.Cg_U-g.IvSBjQxpgsd0YsXISU9UflbZVug");
