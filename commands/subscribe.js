var subscribe = {};

subscribe.args = '';
subscribe.help = 'Tells you time until next season change';
subscribe.notservers = [];
subscribe.main = (bot, msg, channel) => {
    var name = msg.member.nickname;
    if (name == null)
	name = msg.member.user.username;
    msg.member.addRole(msg.guild.roles.find("name", msg.content.split(' ')[2].toLowerCase()))
	.then(member => channel.sendMessage("Successfully added: " + name + " to role " + msg.content.split(' ')[2].toLowerCase()));
}
module.exports = subscribe;
