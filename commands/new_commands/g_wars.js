 args: '',
  help: 'Shows you all upcoming op wars. Annoucnements in English, French and German.',
  notservers: [],
  main: '(bot, msg, channel) => {\n    updateWars();\n    var Wars = require("../ressources/outposts/Wars.json");\n    if (Wars.length == 0) {\n\tchannel.sendMessage("No Upcoming OP Wars");\n    } else {\n\tfor (var War in Wars) {\n\t    channel.sendMessage(WarToEn(Wars[War]) + "\\n" + WarToFr(Wars[War]) + "\\n" + WarToDe(Wars[War]));\n\t}\n    }\n}' 