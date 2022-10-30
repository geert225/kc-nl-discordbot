const Discord = require('discord.js');
const urlchecker = require('../functions/urlchecker');
const role = '1004116254304505997';

module.exports = {
    name: 'planconvoy',
    options: {
        args : [
            "img URL",
            "dm Type",
            "channel",
            "description",
        ],
        neededargs : 4,
        roles : [],
        admincmd : true,
        privatecmd : false,
        avalibleinhelp : false
    },
    description: 'plan a convoy',
    execute(message, args) {
        const descriptiontext = args.slice(3).join(" ");
        if(!urlchecker(args[0])){
            message.channel.send(":exclamation: Url not valid!").then(msg => {
                msg.delete({
                    timeout: 10000
                })
            })
            return;
        }
        if(args[1] != "all" && args[1] != "vtc" && args[1] != "none"){
            message.channel.send(":exclamation: You must specifie the correct message type: *all* (All members get a dm), *vtc* (All vtc members get a dm), *none* (no one gets a dm)").then(msg => {
                msg.delete({
                    timeout: 10000
                })
            })
            return;
        }

        const embed = new Discord.MessageEmbed()
        .setDescription(descriptiontext)
        .setColor("#166B9B")
        .setTitle("Koleka Charters NL")
        .setThumbnail('https://cdn.discordapp.com/attachments/1017173449728327701/1017924187756703775/done_koleka_charters.png')
	    .setImage(args[0]);
        //message.channel.send(embed)

        if(!message.guild.channels.cache.has(args[2])){
            message.channel.send(":exclamation: Channel is incorrect!").then(msg => {
                msg.delete({
                    timeout: 10000
                })
            })
            return;
        }

        const sendchannel = message.guild.channels.cache.get(args[2]);

        sendchannel.send(embed);

        if(args[1] == "all"){
            message.guild.members.cache.forEach(user => {
                if(!user.user.bot){
                    console.log(user.user.username)
                    user.user.send(embed);
                } 
            });
        }
        if(args[1] == "vtc"){
            message.guild.members.cache.forEach(user => {
                if(!user.user.bot && user.roles.cache.has(role)){
                    console.log(user.user.username)
                    user.user.send(embed);
                } 
            });
        }
    }
};