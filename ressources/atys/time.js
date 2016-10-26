var gameCycle=1407507149;
//
// if gameCycle is needed in php or other program, then http://atys.pri.ee/?page=tick gives it
//
//var gameCycle=281100000; // 6506 days, 22:40 (tick in every 100ms)

function getGameCycle(callback) {
    var request = require("request");
    var xml2js = require("xml2js");
    var parser = new xml2js.Parser({explicitArray: false});
    request.post({url:'http://api.ryzom.com/time.php', form: {format:"xml"}}, function(err,httpResponse,body){
		//              console.log("---------------Error--------------" + err);
		//              console.log("---------------Body---------------" + body);
		//              console.log("---------------Http---------------" + httpResponse);
		parser.parseString(body, function (err, result) {
		    console.log(err);
		    gameCycle=parseInt(result["shard_time"]["server_tick"]);
		    callback(parseInt(result["shard_time"]["server_tick"]));
		});
	    });
}

var seasonNames= ['spring','summer','autumn','winter'];
var monthNames = ['Winderly','Germinally','Folially','Floris','Medis','Thermis','Harvestor','Fruton','Fallenor','Pluvia','Mystia','Nivia'];
var dayNames = ['Prima','Dua','Tria','Quarta','Quinteth','Holeth'];

var jsStartTime=new Date();

var clock;// obj, where to put clock text
var updateTimer;
var updateTimeout=1;// seconds

var SYNC=1;
var ATYS_HOUR=3;// 3 IRL minutes per atys hour

/* example html:
<html>
<head>
<script type="text/javascript" src="finaltracker.js"></script>

<script type="text/javascript">
function init(){
var atysDate=new AtysDate();

atysDate.setTime=function(aDate, aTime){
document.getElementById('atys-clock').innerHTML=aDate+' '+aTime;
}
atysDate.setRLCountdown=function(str, rlDate){
document.getElementById('rl-countdown').innerHTML=str+' / '+rlDate.toString();
}

var atysDate2=new AtysDate();

atysDate2.setTime=function(aDate, aTime){
document.getElementById('atys-clock2').innerHTML=aDate;
}
}
</script>
</head>
<body onload="init();">
<div id="atys-clock"></div>
<div id="rl-countdown"></div>
... and second clock
<div id="atys-clock2"></div>
</body>
</html>
*/

function lz(a){
    return(a<10? "0" + a : a);
}

var live;
var channel;
var tick;

function AtysDate(l, c, t){
    this.setTime=new Function();
    this.setRLCountdown=new Function();

    var me=this;

    live = l;
    tick = t;
    channel = c;

    getGameCycle(function(cycle) {
    
    // get function parameter or global value
    tick = tick || cycle;

	
    if (live)
	setInterval(function(){ me.update();}, 1000); // 1 sec
    else
	setTimeout(function(){ me.update();}, 1000);
    });
}

AtysDate.prototype.update = function(){
    this.tick = tick;

    var timeNow=new Date();
    var h,m,s,mm;

    h=timeNow.getUTCHours();
    m=timeNow.getUTCMinutes();
    s=timeNow.getUTCSeconds();

    // new code - take server game cycle and make atys time from it
    var jsCycle=Math.floor((timeNow-jsStartTime)/1000);
    mm=(this.tick/10+jsCycle+SYNC)/60;

    // % == MOD(a;b) == a-floor(a/b)*b;
    var aDays=((mm/3/24));
    var aTime=((mm/ATYS_HOUR)%24);

    var aHour=Math.floor(aTime);
    var aMinF=(aTime-aHour)*60;
    var aMin=Math.floor(aMinF);

    // atys year - 4 cycles, 16 seasons, 48 months, 240 weeks, 1440 days
    var jYearF=((aDays-61)/1440);
    var jYear=Math.floor(jYearF);

    // atys cycle - 4 seasons, 12 months, 60 weeks, 360 days
    var jCycleF=(jYearF-jYear)*4;
    var jCycle=Math.floor(jCycleF);

    // atys season - 3 months, 90 days
    var jSeasonF=(jCycleF-jCycle)*4;
    var jSeason=Math.floor(jSeasonF);

    // atys month - 3 per season
    var jMonthF=(jSeasonF-jSeason)*3;
    var jMonth=Math.floor(jMonthF);

    // atys week - 5 per month
    var jWeekF=(jMonthF-jMonth)*5;
    var jWeek=Math.floor(jWeekF);

    // atys days - 6 per week
    var jDayF=(jWeekF-jWeek)*6;
    var jDay=Math.floor(jDayF);

    //var atysClock=formatNumber(((mm/3)%24),"00.00");
    var atysClock= lz(aHour)+ ":" +lz(aMin);
    //atysClock += " ("+lz(aHour) + "." + lz(Math.floor((aTime-Math.floor(aTime))*100))+")";
    
    var utcClock= lz(h) + ":"+ lz(m) + ":"+lz(s);

    // days to season change
    var asDaysF=90-(aDays-61)%90;
    var asDays=Math.floor(asDaysF);

    var asHourF=(asDaysF-asDays)*24;
    var asHour=Math.floor(asHourF);
    var asMinF=(asHourF-asHour)*60;
    var asMin=Math.floor(asMinF);
    //var asMin=asMinF;

    // rl hours to season change
    var rlDaysF=asDaysF*3/60, rlDays=Math.floor(rlDaysF);
    //var rlHoursF=(asDaysF*24*3)/60;
    var rlHoursF=(rlDaysF-rlDays)*24;
    var rlHours=Math.floor(rlHoursF);
    var rlMinF=(rlHoursF-rlHours)*60;
    var rlMin=Math.floor(rlMinF);
    var rlSecF=(rlMinF-rlMin)*60;
    var rlSec=Math.floor(rlSecF);

    //var rlMS=(rlHours*60*60+rlMin*60+rlSec)*1000;
    var rlMS=rlDaysF*24*60*60*1000;

    var rlDate=new Date(timeNow.getTime()+rlMS);
    var rlCountdown=(rlDays>0 ? rlDays+' days, ' : '')+lz(rlHours)+':'+lz(rlMin)+':'+lz(rlSec);

    var nextSeason=Math.floor(asDays)+' days';
    nextSeason+=', '+lz(asHour)+' hours and '+lz(asMin)+' minutes';

    // what season ?
    var seasonConst=Math.floor(((aDays-61)/90)%4);

    /*
      // make pretty numbers
      jYear=Math.floor(jYearF*1000)/1000;
      jCycle=Math.floor(jCycleF*1000)/1000;
      jSeason=Math.floor(jSeasonF*1000)/1000;
      jMonth=Math.floor(jMonthF*1000)/1000;
      jWeek=Math.floor(jWeekF*10000)/10000;
      jDay=Math.floor(jDayF*100000)/100000;
    */

    // fix numbers (month/week/day 1 is 0 atm)
    //jYear++;
    jCycle++;
    jMonth++;
    jWeek++
    jDay++;

    // show what we have
    clockStr=parseInt(2525+jYear+43)+' JY, AC '+jCycle+', '+monthNames[jSeason*3+jMonth-1]+' ('+seasonNames[jSeason]+'), '+(jDay+(jWeek-1)*6)+', '+dayNames[jDay-1];
    //clockStr+=rlCountdown;

    // update objects values
    this.year=jYear; // counter starts from 2525
    this.cycle=jCycle;
    this.season=jSeason;
    this.month=jMonth;
    this.week=jWeek;
    this.day=(jDay+(jWeek-1)*6);
    this.day_of_week=jDay;
    this.hour=aHour;
    this.minut=aMin;

    this.rlMS=rlMS;
    
    this.setTime(clockStr, atysClock);
    this.setRLCountdown(rlCountdown, rlDate, channel);
}

module.exports = AtysDate;
