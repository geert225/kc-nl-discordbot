const prefix = process.env.PREFIX
const color = '166b9b'
const Discord = require('discord.js');

module.exports = {
    name: 'modhelp',
    options: {
      args : [],
      neededargs : 0,
      roles : [],
      admincmd : true,
      privatecmd : false,
      avalibleinhelp : false
    },
    description: 'help command for moderation stuff',
    execute(message, args) {
      const helpembed = new Discord.MessageEmbed()
        .setTitle('Koleka Charters NL bot commands')
        .setDescription('All commands.')
        .setColor(color)
        .setFooter('©Koleka Charters NL 2022-2023', '')
        .addFields(this.fields)
        .setTimestamp();
      message.channel.send(helpembed);
    },
    pushcmd(cmd){
      argsstr = "";
      if(cmd.options.args.length > 0){
        cmd.options.args.forEach(arg => {
          argsstr += `*__${arg}__*`;
        });
      }
      this.fields.push({
        name: `${prefix}${cmd.name} ${argsstr}`,
        value:  cmd.description
      })
    },
    fields : [

    ]
};