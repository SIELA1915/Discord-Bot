playradio.args = '';
playradio.help = 'Plays AgF Radio stream in specific channel';
playradio.notservers = [];
playradio.main = (bot, msg, channel) => {
    var url = "http://service.pop-stream.de:4000/";
    var path = "/home/pi/Ryzom/Tools/Discord-Bot/1000Hz-5sec.mp3";
    var vChannel = bot.channels.find("id", "215542057291218944");
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
    
    vChannel.join()
	.then(connection => {
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
	    connection.playStream(res)
		.then(dispatcher => {
		    dispatcher.on("end", () => {
			vChannel.leave(); // leave voice channel when done playing file
			console.log("Playback Ended");
		    })
		    dispatcher.on("error", (err) => {
			console.log('Playback Error: ' + err);
			vChannel.leave();
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
