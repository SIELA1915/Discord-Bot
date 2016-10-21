var cookie = {};

cookie.args = '<name>';
cookie.help = 'Gives a cookie to the specified user. If none specified, gives a cookie to you.';
cookie.notservers = [];
cookie.main = (bot, msg, channel) => {
    var mEnd = ", take this cookie as a gift from me.\n               ``_.:::::._\n     .:::'_|_':::.\n    /::' --|-- '::\\ \n   |:\" .---\"---. ':|\n   |: ( O R E O ) :|\n   |:: `-------' ::|\n    \\:::.......:::/\n     ':::::::::::'\n        `'\"\"\"'` ``"
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
module.exports = cookie;
