write.args = '';
write.help = 'Updates Guilds Ryzom API (This may take some seconds).';
write.notservers = [ 'Ryzom Karavan' ];
write.main = (bot, msg) => {
//    console.log(require.cache['/home/pi/Ryzom/Tools/Discord-Bot/amee.js'].children[3]);
    var processes = require.cache['/home/pi/Ryzom/Tools/Discord-Bot/amee.js'].children;
    for (var c in processes) {
	var ex = {};
	for (var i in processes[c].exports) {
	    if (typeof processes[c].exports[i] == "function")
		ex[i] = processes[c].exports[i].toString();
	    else
		ex[i] = processes[c].exports[i];
	}
	fs.writeFileSync(__dirname + "/new_commands/" + path.basename(processes[c].id), util.inspect(ex, false, null));
    }
} 
