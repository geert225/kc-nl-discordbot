const config = require('../../bot.config.json');
const { MessageEmbed } = require('discord.js');

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
        const user = message.mentions.users.first() || message.author;
        const embed = new MessageEmbed()
        .setTitle(`${user.username} zijn avatar.`)
        .setColor(config.Colors.MainEmbed)
        .setImage(user.displayAvatarURL())
      message.channel.send(embed);
        

    },
   
};