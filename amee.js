#!/usr/bin/env node
"use strict";

String.prototype.padRight = function(l,c) {return this+Array((l-this.length+1)<0?0:l-this.length+1).join(c||" ")} // i would never use a nodejs package for this ;)

var Discord = require("discord.js");
var fs = require('fs');

var amee = new Discord.Client({autoReconnect: true});

const OWNERID = '173500455148584960'; // your user id here
const PREFIX = '/amee'; // prefix of the bot e.g. elmo

var commands = {}

// this command makes help
commands.help = {};
commands.help.args = '';
commands.help.help = "view this message";
commands.help.notservers = [];
commands.help.main = function(bot, msg) {
    var fin = "";
    for (let command in commands) {
        // console.log(command);
        if (!commands[command].hide && (msg.channel.isPrivate || commands[command].notservers.indexOf(msg.channel.server.name) < 0)) {
            fin += (command+" "+commands[command].args) + "\n";
        }
    }
    bot.sendMessage(msg, "```\n"+fin+"\n```");
}

commands.load = {};
commands.load.args = '<command>';
commands.load.help = '';
commands.load.hide = true;
commands.load.notservers = [];
commands.load.main = function(bot, msg) {
    if (msg.author.id == OWNERID){
    var args = msg.content.split(' ')[2];
	try {
	    args = args.toLowerCase();
        delete commands[args];
        delete require.cache[__dirname+'/commands/'+args+'.js'];
        commands[args] = require(__dirname+'/commands/'+args+'.js');
        bot.sendMessage(msg, 'Loaded '+args);
    } catch(err) { 
        bot.sendMessage(msg, "Command not found or error loading\n`"+err.message+"`");
    }
    }
}

commands.unload = {};
commands.unload.args = '<command>';
commands.unload.help = '';
commands.unload.hide = true;
commands.unload.notservers = [];
commands.unload.main = function(bot, msg) {
    if (msg.author.id == OWNERID){
        var args = msg.content.split(' ')[2];
        try {
	    args = args.toLowerCase();
            delete commands[args];
            delete require.cache[__dirname+'/commands/'+args+'.js'];
            bot.sendMessage(msg, 'Unloaded '+args);
        }
        catch(err){
            bot.sendMessage(msg, "Command not found");
        }
    }
}

commands.reload = {};
commands.reload.args = '';
commands.reload.help = '';
commands.reload.hide = true;
commands.reload.notservers = [];
commands.reload.main = function(bot, msg) {
    if (msg.author.id == OWNERID){
        var args = msg.content.split(' ')[2];
        try {
	    args = args.toLowerCase();
            delete commands[args];
            delete require.cache[__dirname+'/commands/'+args+'.js'];
            commands[args] = require(__dirname+'/commands/'+args+'.js');
            bot.sendMessage(msg, 'Reloaded '+args);
        }
        catch(err){
            bot.sendMessage(msg, "Command not found");
	    console.log(err);
        }
    }
}

var loadCommands = function() {
    var files = fs.readdirSync(__dirname+'/commands');
    for (let file of files) {
        if (file.endsWith('.js')) {
            //console.log("loading " + file.slice(0, -3));
            commands[file.slice(0, -3)] = require(__dirname+'/commands/'+file);
            //console.log(file + " loaded!");
        }
    }
    console.log("———— All Commands Loaded! ————");
    //console.log(require.cache);
}


var ping = function(msg) {
    var start = Date.now();
    amee.sendMessage(msg, "pong", function(err, message){
        var stop = Date.now();
	var diff = (stop - start);
        amee.updateMessage(message, "pong `"+diff+"ms`");
    });
}


var checkCommand = function(msg) {
    try {
        if(typeof msg.content.split(' ')[1] === 'undefined') {
            //bot.sendMessage(msg, Array(16).join('wat' -1) + " Batman!");
            ping(msg);
        } else {
	    amee.startTyping(msg.channel);
            commands[msg.content.split(' ')[1].toLowerCase()].main(amee, msg);
	    amee.stopTyping(msg.channel);
            //console.log(commands[msg.content.split(' ')[1]].help);
        }
    }
    catch(err) {
        console.log(err.message);
    }
}

var checkNewCommands = (msg) => {
    msg.content = msg.content.toLowerCase();
    for (var c in commands) {
	if (commands[c].tagged === undefined) continue;
	if (msg.content.includes(" me "))
	    msg.content.replace(" me ", " <@" + msg.author.id + "> ");
	if (msg.content.includes(" i "))
	    msg.content.replace(" i ", " <@" + msg.author.id + "> ");
	var tags = commands[c].tags;
	var isC = true;
	for (var t in tags) {
	    if (!msg.content.includes(tags[t])) {
		isC = false;
		break;
	    }
	}
	if (!isC) continue;
	var oMentions = commands[c].obl;
	for (var m in oMentions) {
	    if (!msg.content.includes(oMentions[m])) {
		isC = false;
		break;
	    }
	}
	if (!isC) continue;
	commands[c].tagged(amee, msg);
    }
}

//when bot is ready load commands
amee.on("ready", () => {
    console.log("Ready to begin! Serving in " + amee.channels.length + "channels");
    amee.setStatus("online", "watching over Atys");
    var gl = require("./globalFuncs.js")();
    loadCommands();
/*    var request = require("request");
    request({ // be sure to have request installed
   method: "GET",
   uri: "http://i.imgur.com/pfmJgi8.jpg",
   encoding: null}, function(err, res, body) {
   amee.setAvatar(body);
});*/
});

amee.on("serverNewMember", function(server, user) {
    if (server.name == "Ryzom Karavan") {
	amee.sendMessage(server.channels.get("name", "verification"), amee.user.username + " Aiye, my follower! Welcome to the Ryzom Karavan Discord Server! Please leave a mes\
sage with @Administrators, telling your in-game name and which Guild you're in, so we can ensure that no spies have access to our server.");
    } else if (server.name == "Rift Walkers") {
	amee.sendMessage(server.channels.get("name", "verify"), "Welcome to the server of the Rift Walkers! Get to voice chat with our members or ask Amee for useful information. But first, you got to highlight HO's or GL and tell them your ingame name, so they can verify you're a member of us. Have fun!");
    }
});

//when the bot receives a message
amee.on("message", msg => {
    if (msg.channel.id != "178552737993195530" && msg.channel.id != "176018284364169216" && msg.author != amee.user) {
	if (msg.content.startsWith('<@'+amee.user.id+'>') || msg.content.startsWith('<@!'+amee.user.id+'>') || msg.content.startsWith(PREFIX)) {
            checkCommand(msg);
	} else {
	    checkNewCommands(msg);
	}
    }
});

amee.on("presence", function(oldUser, newUser) {
    if (oldUser.status == "offline" && newUser.status == "online" && amee.servers.get("name", "Rift Walkers").members.has("id", newUser.id)) {
	var rChar = require("./ressources/ryzomapi/Char_Map.json")[newUser.id];
	updateAPI([rChar], false);
	setTimeout(commands['updateguild'].helper(), 5000);
    };
});

// when things break
amee.on('error', (err) => {
    console.log("————— BIG ERROR —————");
    console.log(err);
    console.log("——— END BIG ERROR ———");
});

//when the bot disconnects
amee.on("disconnected", () => {
	//alert the console
	console.log("Disconnected!");
});

amee.loginWithToken("MTc4NTkwMjYyMTQ5MzgyMTQ0.Cg_U-g.IvSBjQxpgsd0YsXISU9UflbZVug");
