module.exports = {
    name: 'avatar',
    options: {
      args : [
          "User",
      ],
      neededargs : 0,
      roles : [],
      admincmd : false,
      privatecmd : false,
      avalibleinhelp : true
    },
    description: 'Get the avatar from a user',
    execute(message, args) {
        if (!message.guild) return;
        const prefix = process.env.PREFIX
        const color = '166b9b'
        const Discord = require('discord.js');
        const user = message.mentions.users.first() || message.author;
        const avatarembed = new Discord.MessageEmbed()
        .setTitle(`${user.username} zijn avatar.`)
        .setColor(color)
        .setImage(user.displayAvatarURL())
      message.channel.send(avatarembed);
        

    },
   
};