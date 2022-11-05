const config = require('../bot.config.json');
const { MessageEmbed } = require('discord.js');
const userdata = require('../functions/updateFile')

module.exports = {
    name: 'newuser',
    event:  'guildMemberAdd',
    client: null,
    execute(member){
        console.log(`member id: [${member.id}] joined the guild ${member.guild.id}`);
        if(member.guild.id != config.Guild.ID) return;
        const channel = member.guild.channels.cache.get(config.Channels.WelkomChannel);
        if (!channel) return console.log("Welkom channel not found!");
        const embed = new MessageEmbed()
        .setTitle(`Welcome to Koleka Charters NL!`)
        .setColor(config.Colors.MainEmbed)
        .setDescription(`Welcome ${member.user} \nBefore you start, read the rules and other information! \nIf you have any questions, please let us know.\n\nWith best regards,\nKoleka Charters NL `)
        .setThumbnail(config.ImageUrl.Logo)
        .setImage(config.ImageUrl.Welkom)
        .addField('Total members', member.guild.memberCount, false)
        .setFooter(config.General.FooterText, '')
        .setTimestamp()
  
        member.roles.add(config.Roles.Outsider);
        member.send(`Welcome ${member.user} to Koleka Charters NL!\nBefore you start, read the rules and other information!\nIf you have any questions, please let us know.\n\nWith best regards,\n Koleka Charters NL`)
        channel.send(embed);

        if(!userdata[member.id]){
            //Init data for new user
            userdata[member.id] = {
                tmp: 'Not linked',
                tbo: 'Not linked',
                level: 1,
                xp: 0,
                warnings: 0,
                cardtype: 0
            }
            updateFile('./userdata.json', userdata);
        }
    }
};