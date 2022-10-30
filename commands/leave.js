const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'leave',
    options: {
        args : [],
        neededargs : 0,
        roles : [],
        admincmd : false,
        privatecmd : false,
        avalibleinhelp : true
      },
    description: 'let the bot leave the voice channel',
    execute(message, args) {
        if (!message.guild) return;
        if (message.member.voice.channelid != client.voice.channelid)return message.channel.send(':exclamation:You are not conected to the same voice channel!').then(msg => {msg.delete({ timeout: 10000 })});
     if (message.member.voice.channel) {
         const channel = message.member.voice.channel
         channel.leave();
         message.channel.send(':exclamation:Left Voice Channel.').then(msg => {msg.delete({ timeout: 10000 })});return;
    }else {
        message.channel.send(':exclamation:You are not in a voice channel!')
      }
    }
};

    
    
  