const warnings = require('../warnings');
const color = '166b9b'
const Discord = require('discord.js');
const fs = require("fs");
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

    const guildid = message.guild.id
    const user = message.member
    const add = 1
    const userid = message.member.id
    const reason = args.join(' ')
    if (!reason){
        message.channel.send(':exclamation:Please specify a reason.').then(msg => {msg.delete({ timeout: 10000 })});return;
    }
    const warnamount = Math.floor(warnings[target.id].warnings) + add
    console.log(warnings[target.id].warnings)    
    const warnchannel = '735954137555927082'

    const warnembed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`:warning:WARNING!`)
    .addFields(
        { name: 'Warned user:', value: `${target}` },
        { name: 'By:', value: `${user}` },
        { name: 'Reason:', value: `${reason}` },
        { name: 'total warns:', value: `${warnamount}` }
      )
    .setTimestamp()
    .setFooter('©Koleka Charters NL 2022-2023', '')
    message.guild.channels.cache.get(warnchannel).send(warnembed)
    message.author.send(`:white_check_mark: ${target} has been warned!`)

    const dmwarnembed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`:warning:WARNING!`)
    .setDescription(`You have been warned!`)
    .addFields(
        { name: 'Reason:', value: `${reason}` },
        { name: 'total warns:', value: `${warnamount}` }
      )
    .setTimestamp()
    .setFooter('©Koleka Charters NL 2022-2023', '')
    target.send(dmwarnembed)
    console.log(target)

    warnings[target.id].warnings = warnamount
    fs.writeFile("./warnings.json", JSON.stringify(warnings), (err) => {
        if(err) console.log(err)}
        )
    console.log(warnamount)
    
    
    },
   
};