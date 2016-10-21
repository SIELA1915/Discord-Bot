{ args: '',
  help: 'Lists all bosses, grouped by possibly spawned or not.',
  notservers: [ 'Ryzom Karavan' ],
  main: '(bot, msg, channel) => {\n\tvar bosses = getBosses();\n\tfor (var port in bosses) {\n\t    channel.sendMessage(bosses[port]);\n    }\n}' }