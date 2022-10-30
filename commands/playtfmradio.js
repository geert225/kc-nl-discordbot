const userdata = require('../userdata');
const warnings = require('../warnings');
const fs = require("fs");
const prefix = process.env.PREFIX
const color = '370000'
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'playtfm',
    options: {
      args : [],
      neededargs : 0,
      roles : [],
      admincmd : false,
      privatecmd : false,
      avalibleinhelp : true
    },
    description: 'play tfm radio in voice channel',
    execute(message, args) {
        if (!message.guild) return;
     const streamURL = 'https://radio.truckers.fm/'
    
     if (message.member.voice.channel) {
        message.member.voice.channel.join()
          .then(connection => {
            message.channel.send(':white_check_mark:Connected! Now playing Truckersfm.');
            const dispatcher = connection.play(`${streamURL}`);
            dispatcher.setVolume(0.0035);
          })
          .catch(console.log);
      } else {
        message.channel.send(':exclamation:You are not in a voice channel!').then(msg => {msg.delete({ timeout: 10000 })});return;
      }
    },
   
};

    
    
  