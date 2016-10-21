var updateme = {};

updateme.args = '';
updateme.help = 'Updates your Ryzom API (This may take some seconds).';
updateme.notservers = [ 'Ryzom Karavan' ];
updateme.main = (bot, msg, channel) => {
	    var rChar = require("../ressources/ryzomapi/Char_Map.json")[msg.author.id];
	    updateAPI([rChar], false);
	    channel.sendMessage("Updated API for " + rChar + ".");
}
module.exports = updateme;
