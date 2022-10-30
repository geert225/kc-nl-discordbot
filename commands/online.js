module.exports = {
    name: 'online',
    options: {
        args : [],
        neededargs : 0,
        roles : [],
        admincmd : false,
        privatecmd : false,
        avalibleinhelp : true
      },
    description: 'check how many users are online',
    execute(message, args) {
        message.channel.send(`**Online members:** ${message.guild.memberCount}`);
    },
   
};