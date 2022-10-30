const userdata = require('../userdata');
const color = '166b9b'

module.exports = {
    name: 'follow',
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
    description: 'follow a user live on the truckers MP map',
    execute(message, args) {
        if (!message.guild) return;
        const user = message.mentions.users.first() || message.author;
        if (!user) { message.channel.send(':exclamation:Please specify someone to follow.').then(msg => {msg.delete({ timeout: 10000 })});return;} 
        if(!userdata[user.id]) {
            message.channel.send(':exclamation:user has not link his tmp!').then(msg => {msg.delete({ timeout: 10000 })});return;
        }   
     
        const data = userdata[user.id].tmp
        if (data === 'Not linked') {
            message.channel.send(':exclamation:user has not link his tmp!').then(msg => {msg.delete({ timeout: 10000 })});return;
        }
        var regex = /[+-]?\d+(?:\.\d+)?/g;
        var tmpid
        while (tmpid = regex.exec(data)) {
        var followlink = 'https://map.truckersmp.com/?follow=' + tmpid[0]
        const followembed = new Discord.MessageEmbed()
        .setDescription(`You can follow the user ${user} via the link. \n ${followlink}`)
        .setColor(color)
        .setFooter('©Koleka Charters NL 2022-2023', '')
        .setTimestamp();
        message.channel.send(followembed)
        } 
    }
};