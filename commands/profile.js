const userdata = require('../userdata');
const warnings = require('../warnings');
const fs = require("fs");
const prefix = process.env.PREFIX
const color = '166b9b'
const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'profile',
    options: {
      args : [
        "User"
      ],
      neededargs : 0,
      roles : [],
      admincmd : false,
      privatecmd : false,
      avalibleinhelp : true
    },
    description: 'show your profile',
    execute(message, args) {
            if(message.guild.id === '696019111888814160') return;
            const user = message.mentions.users.first() || message.author;
            if(!userdata[user.id]){
              userdata[user.id] = {
                tmp: 'Not linked',
                tbo: 'Not linked',
                level: 1,
                xp: 0
             }
             console.log(userdata[message.author.id])
             fs.writeFile("./userdata.json", JSON.stringify(userdata), (err) => {
               if(err) console.log(err)
            const tmpinfo = userdata[user.id].tmp
            const tboinfo = userdata[user.id].tbo
            const levelinfo = userdata[user.id].level
            const xpinfo = userdata[user.id].xp
            const profileembed = new Discord.MessageEmbed()
            .setColor(color)
            .setThumbnail(user.displayAvatarURL())
            .setImage('https://cdn.discordapp.com/attachments/790905868202934312/790906725388648478/Naamloos.png')
            .setTitle(`Profile of ${user.username}`)
            .setURL('https://trucksbook.eu/company/157826/')
            .addFields(
              { name: 'Discord name:', value: `${user.username}` },
              { name: 'Truckersmp:', value: `:link: ${tmpinfo}` },
              { name: 'Trucksbook:', value: `:link: ${tboinfo}` },
              { name: 'xp', value: `${xpinfo}`, inline: true },
              { name: 'level', value: `${levelinfo}`, inline: true }
            )
            .setTimestamp()
            .setFooter('©Koleka Chartes NL 2022-2023', '')
            message.channel.send(profileembed)
             })
           }
            const tmpinfo = userdata[user.id].tmp
            const tboinfo = userdata[user.id].tbo
            const levelinfo = userdata[user.id].level
            const xpinfo = userdata[user.id].xp
            const profileembed = new Discord.MessageEmbed()
            .setColor(color)
            .setThumbnail(user.displayAvatarURL())
            .setImage('https://cdn.discordapp.com/attachments/790905868202934312/790906725388648478/Naamloos.png')
            .setTitle(`Profile of ${user.username}`)
            .setURL('https://trucksbook.eu/company/157826/')
            .addFields(
              { name: 'Discord name:', value: `${user.username}` },
              { name: 'Truckersmp:', value: `:link: ${tmpinfo}` },
              { name: 'Trucksbook:', value: `:link: ${tboinfo}` },
              { name: 'xp', value: `${xpinfo}`, inline: true },
                { name: 'level', value: `${levelinfo}`, inline: true }
            )
            .setTimestamp()
            .setFooter('©Koleka Chartes NL 2022-2023', '')
            message.channel.send(profileembed)
          }
    
   
};