const userdata = require('../userdata');
const warnings = require('../warnings');
const fs = require("fs");
const prefix = process.env.PREFIX
const color = '166b9b'
const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'removewarn',
    description: 'remove a warn from a user',
    options: {
        args : [
            "User"
        ],
        neededargs : 0,
        roles : [],
        admincmd : true,
        privatecmd : false,
        avalibleinhelp : false
    },
    execute(message, args) {
       if (!message.member.hasPermission("KICK_MEMBERS")) {
        message.channel.send(":x:You don't have rights to this command!").then(msg => {msg.delete({ timeout: 10000 })});return;}
       const target = message.mentions.users.first()
       if (!target) {
           message.channel.send(':exclamation:Please specify someone to remove a warn from.').then(msg => {msg.delete({ timeout: 10000 })});return;
       }
       args.shift()

    const guildid = message.guild.id
    const user = message.member
    const remove = 1
    const userid = message.member.id
    const warnamount = Math.floor(warnings[target.id].warnings) - remove
    console.log(warnings[target.id].warnings)    
    const warnchannel = '790562786216378419'

    
    message.author.send(`:white_check_mark: Removed a warn. ${target} has now ${warnamount} warnings.`)

    warnings[target.id].warnings = warnamount
    fs.writeFile("./warnings.json", JSON.stringify(warnings), (err) => {
        if(err) console.log(err)}
        )
    console.log(warnamount)
    
    
    },
   
};