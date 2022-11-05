const { MessageEmbed } = require('discord.js');
const config = require('../../bot.config.json');

module.exports = {
    name: 'help',
    options: {
      args : [],
      neededargs : 0,
      roles : [],
      admincmd : false,
      privatecmd : false,
      avalibleinhelp : true
    },
    description: 'help menu',
    execute(message, args) {
      message.delete();
      const helpembed = new MessageEmbed()
        .setTitle('Koleka Charters NL bot commands')
        .setDescription('All commands.')
        .setColor(config.Colors.MainEmbed)
        .setThumbnail(config.ImageUrl.Logo)
        .setFooter(config.General.FooterText, '')
        .addFields(this.fields)
        .setTimestamp();
        message.channel.send(helpembed).then(msg => {msg.delete({ timeout: 10000 })});;
    },
    pushcmd(cmd){
      argsstr = "";
      if(cmd.options.args.length > 0){
        cmd.options.args.forEach(arg => {
          argsstr += `*__${arg}__* `;
        });
      }
      this.fields.push({
        name: `${config.General.Prefix}${cmd.name} ${argsstr}`,
        value:  cmd.description
      })
    },
    fields : [

    ]
};