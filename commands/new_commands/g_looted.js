 args: '<Named>',
  help: 'Sets a timer of 50 minutes for Named.',
  notservers: [ 'Ryzom Karavan' ],
  main: '(bot, msg, channel) => {\n    var aArg = msg.content.split(\' \');\n    if (aArg.length >= 3) {\n\tvar name = aArg.slice(2).join(\' \');\n\tvar timer = function timer(user, named) {\n\t    channel.sendMessage(named + " will respawn in 5 minutes, " + user + "!");\n\t}\n\tvar to = setTimeout(timer, 45 * 60 * 1000, msg.author.toString(), name);\n\tchannel.sendMessage("Timer set");\n    } else {\n\tchannel.sendMessage("Not enough Arguments.");\n    }\n}' 