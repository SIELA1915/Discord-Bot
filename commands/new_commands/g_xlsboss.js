 args: '<gmt-offset>',
  help: 'Generates an xls spreadsheet with all the boss infos. Uses gmt-offset (plain number) for respawn time calculation.',
  notservers: [ 'Ryzom Karavan' ],
  main: '(bot, msg, channel) => {\n    var aArg = msg.content.split(" ");\n    if (aArg.length < 3) aArg[2] = 0;\n    bossesToExcel(aArg[2], bot, msg.channel);\n}' 