{ args: '',
  help: 'Shows time and date utc',
  notservers: [],
  main: '(bot, msg, channel) => {\n    channel.sendMessage(new Date().toUTCString());\n}' }