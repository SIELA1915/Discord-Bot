{ args: '<name>',
  help: 'Hugs the specified user. If none specified, hugs you.',
  notservers: [],
  main: '(bot, msg, channel) => {\n    var aArg = msg.content.split(\' \');\n    var Arg = aArg[2];\n\tif (Arg) {\n\t    if (bot.users.get("username", Arg) != null) {\n\t\tchannel.sendMessage(bot.user.username + " hugs " + bot.users.get("username", Arg) + "!");\n\t    } else {\n\t\tchannel.sendMessage(bot.user.username + " hugs " + Arg + "!");\n\t    }\n\t} else {\n\t    channel.sendMessage(bot.user.username + " hugs " + msg.author);\n\t}\n}',
  tags: [ 'hug' ],
  mentions: [ [ 'hug <@', 'hugs <@' ] ],
  obl: [],
  tagged: '(bot, msg, channel) => {\n    var aArg = msg.mentions;\n\n    var finArgs = [];\n    var ordArgs = {};\n    var cont = msg.content;\n    for (var m in hugs.mentions) {\n\tvar f = false;\n\tfor (var a in hugs.mentions[m]) {\n\t    if (cont.indexOf(hugs.mentions[m][a]) != -1) {\n\t\tordArgs[String(cont.indexOf(hugs.mentions[m][a]))] = m;\n\t\tf = true;\n\t\tbreak;\n\t    }\n\t}\n\tif (!f) {\n\t    ordArgs[String(2000+m)] = m;\n\t    aArg.push(bot.user);\n\t}\n    }\n    var i = 0;\n    for (var o in ordArgs) {\n\tfinArgs[ordArgs[o]] = aArg[i];\n\t++i;\n    }\n    \n    channel.sendMessage(bot.user.username + " hugs " + finArgs[0] + "!");\n}' }