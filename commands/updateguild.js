updateguild.args = '';
updateguild.help = 'Updates Guilds Ryzom API (This may take some seconds).';
updateguild.notservers = [ 'Ryzom Karavan' ];
updateguild.main = (bot, msg, channel) => {
	    updateAPI([], true);
	    channel.sendMessage("Updated API for all Guilds.");
};
updateguild.helper = function () {
    updateAPI([], true);
}
