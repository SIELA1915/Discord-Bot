utc.args = '';
utc.help = 'Shows time and date utc';
utc.notservers = [];
utc.main = (bot, msg, channel) => {
    channel.sendMessage(new Date().toUTCString());
} 