var fs = require("fs");

function sendFile(Amee, channel) {
    Amee.sendFile(channel, "../ressources/bosses/Bosses.xlsx", "Bosses.xlsx");
}

function bossesToExcel(utcOff, Amee, channel) {
    var Bosses = require("../ressources/bosses/Bosses.json");

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

    workbook.xlsx.writeFile("../ressources/bosses/Bosses.xlsx").then(function(){
	console.log("done");
	sendFile(Amee, channel);
    });
}

var xls = {};

xls.args = "<gmt-offset>";
xls.help = "Generates an xls spreadsheet with all the boss infos. Uses gmt-offset (plain number) for respawn time calculation."
xls.notservers = ["Ryzom Karavan"];
xls.main = (bot, msg) => {
    if (msg.channel.isPrivate || msg.channel.server.id == "175308871122812929") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else{
	var aArg = msg.content.split(" ");
	if (aArg.length < 3) aArg[2] = 0;
	bossesToExcel(aArg[2], bot, msg.channel);
    }
}
module.exports = xls;
