
const { MessageEmbed } = require('discord.js');
const config = require('../../bot.config.json');
const { updateFile } = require('../../functions/updateFile');
const userdata = require('../../userdata.json');

module.exports = {
    name: 'warn',
    options: {
        args : [
            "user",
            "reason"
        ],
        neededargs : 0,
        roles : [],
        admincmd : false,
        privatecmd : false,
        avalibleinhelp : false
      },
    description: 'give a user a warn',
    execute(message, args) {
       if (!message.guild) return;
       if (!message.member.hasPermission("KICK_MEMBERS")) {
        message.channel.send(":x:You don't have rights to this command!").then(msg => {msg.delete({ timeout: 10000 })});return;}
       const target = message.mentions.users.first()
       if (!target) {
           message.channel.send(':exclamation:Please specify someone to warn.').then(msg => {msg.delete({ timeout: 10000 })});return;
       }
       args.shift()

    const user = message.member
    const reason = args.join(' ')
    if (!reason){
        message.channel.send(':exclamation:Please specify a reason.').then(msg => {msg.delete({ timeout: 10000 })});return;
    }
    const warnamount = Math.floor(userdata[target.id].warnings) + 1

    const warnembed = new MessageEmbed()
    .setColor(config.Colors.MainEmbed)
    .setTitle(`:warning:WARNING!`)
    .addFields(
        { name: 'Warned user:', value: `${target}` },
        { name: 'By:', value: `${user}` },
        { name: 'Reason:', value: `${reason}` },
        { name: 'total warns:', value: `${warnamount}` }
      )
    .setTimestamp()
    .setFooter(config.General.FooterText, '')

    const loggingchannel = message.guild.channels.cache.get(config.Channels.warnChannel);
    if(loggingchannel){
        loggingchannel.send(warnembed);
    }
    message.author.send(((loggingchannel) ? `:white_check_mark: ${target} has been warned and warn has been logged!` : `:white_check_mark: ${target} has been warned!`))

    const dmwarnembed = new MessageEmbed()
    .setColor(config.Colors.MainEmbed)
    .setTitle(`:warning:WARNING!`)
    .setDescription(`You have been warned!`)
    .addFields(
        { name: 'Reason:', value: `${reason}` },
        { name: 'total warns:', value: `${warnamount}` }
      )
    .setTimestamp()
    .setFooter(config.General.FooterText, '')
    target.send(dmwarnembed)

    userdata[target.id].warnings = warnamount
    updateFile('./userdata.json', userdata);
    }
};