module.exports = {
    name: 'ping',
    options: {
        args : [],
        neededargs : 0,
        roles : [],
        admincmd : false,
        privatecmd : false,
        avalibleinhelp : true
    },
    description: 'simple ping command',
    execute(message, args) {
        message.channel.send('pong!')
    } 
};