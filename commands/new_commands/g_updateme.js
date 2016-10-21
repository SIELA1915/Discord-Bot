 args: '',
  help: 'Updates your Ryzom API (This may take some seconds).',
  notservers: [ 'Ryzom Karavan' ],
  main: '(bot, msg, channel) => {\n\t    var rChar = require("../ressources/ryzomapi/Char_Map.json")[msg.author.id];\n\t    updateAPI([rChar], false);\n\t    channel.sendMessage("Updated API for " + rChar + ".");\n}' 