looted.args = '<Named>';
looted.help = 'Sets a timer of 50 minutes for Named.';
looted.notservers = [ 'Ryzom Karavan' ];
looted.main = (bot, msg, channel) => {
    var aArg = msg.content.split(' ');
    if (aArg.length >= 3) {
	var name = aArg.slice(2).join(' ');
	var timer = function timer(channel, user, named) {
	    channel.sendMessage(named + " will respawn in 5 minutes, " + user + "!");
	}
	var to = setTimeout(timer, 45 * 60 * 1000, channel, msg.author.toString(), name);
	channel.sendMessage("Timer set");
    } else {
	channel.sendMessage("Not enough Arguments.");
    }
} 
