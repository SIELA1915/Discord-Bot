var playr = {};

playr.args = "";
playr.help = "Plays AgF Radio stream in specific channel";
playr.notservers = [];
playr.main = (bot, msg) => {
    var url = "http://service.pop-stream.de:4000/";
    var path = "/home/pi/Ryzom/Tools/Discord-Bot/1000Hz-5sec.mp3";
    var channel = "215542057291218944";
    var icy = require("icy");
    var Transcoder = require("stream-transcoder");

    /*    var radio = require("radio-stream");

    var stream = radio.createReadStream(url);

    stream.on("connect", function() {
	console.error("Radio Stream connected!");
	console.error(stream.headers);
    });

    stream.on("metadata", function(title) {
	console.error(title);
	});*/
    
    bot.joinVoiceChannel(channel).then(connection => {
/*	connection.playRawStream(stream).then(intent => {
	    intent.on("end", () => {
		bot.leaveVoiceChannel(channel); // leave voice channel when done playing file
		console.log("Playback Ended");
	    })
	    intent.on("error", (err) => {
		console.log('Playback Error: ' + err);
		bot.leaveVoiceChannel(channel);
	    })
	})*/

	icy.get(url, function(res) {
	    var str = new Transcoder(res)
		.audioBitrate(64 * 1000)
		.stream();
	    connection.playRawStream(str).then(intent => {
		    intent.on("end", () => {
			bot.leaveVoiceChannel(channel); // leave voice channel when done playing file
			console.log("Playback Ended");
		    })
		    intent.on("error", (err) => {
			console.log('Playback Error: ' + err);
			bot.leaveVoiceChannel(channel);
		    })
		})
	})

/*	connection.playFile(path)
	    .then(intent => {
		intent.on("end", () => {
		    bot.leaveVoiceChannel(channel); // leave voice channel when done playing file
		    console.log("Playback Ended");
		})
		intent.on("error", (err) => {
		    console.log('Playback Error: ' + err);
		    bot.leaveVoiceChannel(channel);
		});
	})*/
    })
	.catch(err => {
	    console.log('Error joining voice channel: ' + err);
	});
}

module.exports = playr;
