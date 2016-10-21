{ args: '',
  help: 'Updates Guilds Ryzom API (This may take some seconds).',
  notservers: [ 'Ryzom Karavan' ],
  main: '(bot, msg, channel) => {\n\t    updateAPI([], true);\n\t    channel.sendMessage("Updated API for all Guilds.");\n}',
  helper: 'function () {\n    updateAPI([], true);\n}' }