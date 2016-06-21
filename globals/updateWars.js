exports.main = function() {
    var Wars = require("../ressources/outposts/Wars.json");
    console.log("updating Wars");
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
    fs.writeFileSync("../ressources/outposts/Wars.json", JSON.stringify(Wars), "utf8");
};
