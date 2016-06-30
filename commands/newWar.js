var fs = require("fs");

function NewWar(Prod, Q, Attacker, AttFaction, Help, Minute, Hour, Day, Month) {
    var Outposts = require("../ressources/outposts/Outposts.json");

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
	var Wars = require("../ressources/outposts/Wars.json");
	console.log("Added War: " + JSON.stringify(War, null, 2));
	Wars[Wars.length] = War;
	fs.writeFileSync(__dirname + "/../ressources/outposts/Wars.json", JSON.stringify(Wars), "utf8");
	return "Added War successfully";
    }
}

var newWar = {};

newWar.args = "<Prod.> <Q> <G> <F> <Help> <M> <D> <H> <M>";
newWar.help = "Register a new war in the system. The Help Argument is either 0 or 1, 0 meaning that it's a handover. The time and date arguments are always in GMT. No arguments for more information.";
newWar.notservers = [];
newWar.main = (bot, msg) => {
    var aArg = msg.content.split(' ');
    console.log(aArg);
    var from = -1;
    var to = -1;
    for (var a in aArg) {
	var v = aArg[a];
	if (v.includes("\"")) {
	    if (from == -1) {
		from = a;
	    } else if (to == -1) {
		to = a;
		break;
	    }
	}
    }
    ++to;
    console.log(from);
    console.log(to);
    var att = aArg.splice(from, to-from).join(" ");
    console.log(att);
    att = att.replace(/\"/g, "");
    aArg.splice(from, 0, att);
    console.log(aArg);
	
	var glo = require("../globalFuncs.js")();
	if (aArg.length != 11) {
	    bot.sendMessage(msg.channel, "Wrong Format! Use: \n/amee newWar <Product of the Op> <Quality> <Attacker Guild> <Attacker Faction> <Help> <Month> <Day> <Hours> <Minutes>");
	} else {
	    var Prod = aArg[2];
	    var Q = aArg[3];
	    var Attacker = aArg[4];
	    var AttFaction = aArg[5];
	    var Help = aArg[6];
	    var Month = aArg[7];
	    var Day = aArg[8];
	    var Hour = aArg[9];
	    var Minute = aArg[10];
	    
	    glo.updateWars();
	    var success = NewWar(Prod, Q, Attacker, AttFaction, Help, Minute, Hour, Day, Month);
	    bot.sendMessage(msg.channel, success);
	}
    }
module.exports = newWar;
