{ args: '<name>',
  help: 'Gives milk and cookies to the specified user. If none specified, gives milk and cookies to you.',
  notservers: [],
  main: '(bot, msg, channel) => {\n    var mEnd = "! Here you have some milk and cookies as a gift from me!\\n                                                                      ``.-\'\'\'\'\'-.\\n                               |\'-----\'|\\n                               |-.....-|\\n                               |       |\\n                               |       |\\n              _,._             |       |\\n         __.o`   o`\\"-.         |       |\\n      .-O o `\\"-.o   O )_,._    |       |\\n     ( o   O  o )--.-\\"`O   o\\"-.`\'-----\'`\\n      \'--------\'  (   o  O    o)  \\n                   `----------` ``";\n    var aArg = msg.content.split(\' \');\n    var Arg = aArg[2];\n\tif (Arg) {\n\t    if (bot.users.get("username", Arg) != null) {\n\t\tchannel.sendMessage(bot.user.username + " aiye, " + bot.users.get("username", Arg) + mEnd);\n\t    } else {\n\t\tchannel.sendMessage(bot.user.username + " aiye, " + Arg + mEnd);\n\t    }\n\t} else {\n\t    channel.sendMessage(bot.user.username + " aiye, " + msg.author + mEnd);\n\t}\n}' }