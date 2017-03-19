var season = {};

season.args = '';
season.help = 'Tells you time until next season change';
season.notservers = [];
season.main = (bot, msg, channel) => {
    var Atys = require("./../ressources/atys/time.js");
    var atysDate = new Atys(0, channel);
    atysDate.setRLCountdown = (str, rlDate, channel) => {
	channel.sendMessage("Next season change in: " + str)
	    .catch(console.log);
	delete require.cache[require.resolve('./../ressources/atys/time.js')];
    }
}
module.exports = season;
