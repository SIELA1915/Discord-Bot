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
        if (!commands[command].hide /*&& (commands[command].notservers.indexOf(msg.channel.server.name) < 0)*/) {
            fin += (command+" "+commands[command].args).padRight(50, ' ') +commands[command].help + "\n";
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
            commands[msg.content.split(' ')[1]].main(amee, msg);
            //console.log(commands[msg.content.split(' ')[1]].help);
        }
    }
    catch(err) {
        console.log(err.message);
    }
}

//when bot is ready load commands
amee.on("ready", () => {
    console.log("Ready to begin! Serving in ${amee.channels.length} channels");
    amee.setStatus("online", "watching over Atys");
    loadCommands();
    var request = require("request");
    request({ // be sure to have request installed
   method: "GET",
   uri: "http://i.imgur.com/pfmJgi8.jpg",
   encoding: null}, function(err, res, body) {
   client.setAvatar(body);
});
});

//when the bot receives a message
amee.on("message", msg => {
    if (msg.content.startsWith('<@'+amee.user.id+'>') || msg.content.startsWith('<@!'+amee.user.id+'>') || msg.content.startsWith(PREFIX)) {
        checkCommand(msg);
    }
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

	//exit node.js with an error
	process.exit(1);
});

amee.loginWithToken("MTc4NTkwMjYyMTQ5MzgyMTQ0.Cg_U-g.IvSBjQxpgsd0YsXISU9UflbZVug");
