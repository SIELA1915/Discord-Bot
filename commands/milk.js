milk.args = '<name>';
milk.help = 'Gives milk and cookies to the specified user. If none specified, gives milk and cookies to you.';
milk.notservers = [];
milk.main = (bot, msg, channel) => {
    var mEnd = "! Here you have some milk and cookies as a gift from me!\n                                                                      ``.-'''''-.\n                               |'-----'|\n                               |-.....-|\n                               |       |\n                               |       |\n              _,._             |       |\n         __.o`   o`\"-.         |       |\n      .-O o `\"-.o   O )_,._    |       |\n     ( o   O  o )--.-\"`O   o\"-.`'-----'`\n      '--------'  (   o  O    o)  \n                   `----------` ``";
    var aArg = msg.content.split(' ');
    var Arg = aArg[2];
	if (Arg) {
	    if (bot.users.get("username", Arg) != null) {
		channel.sendMessage(bot.user.username + " aiye, " + bot.users.get("username", Arg) + mEnd);
	    } else {
		channel.sendMessage(bot.user.username + " aiye, " + Arg + mEnd);
	    }
	} else {
	    channel.sendMessage(bot.user.username + " aiye, " + msg.author + mEnd);
	}
} 
