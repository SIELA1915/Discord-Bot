var upg = {};

upg.args = "";
upg.help = "Updates Guilds Ryzom API (This may take some seconds).";
upg.notservers = ["Ryzom Karavan"];
upg.main = (bot, msg) => {
    if (msg.channel.isPrivate || msg.channel.server.id == "175308871122812929") {
	bot.sendMessage(msg.channel, "This functionality isn't available.");
    } else {
	    updateAPI([], true);
	    bot.sendMessage(msg.channel, "Updated API for all Guilds.");
    }
}
upg.helper = () => {
    updateAPI([], true);
}
module.exports = upg;
