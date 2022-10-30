module.exports = {
    name: 'gn',
    options: {
        args : [],
        neededargs : 0,
        roles : [],
        admincmd : false,
        privatecmd : false,
        avalibleinhelp : true
    },
    description: 'Send a cool gif (gn)',
    execute(message, args) {
        const gn = 'https://media.giphy.com/media/MKtl8U2j06x0PyI4XU/giphy.gif'
        message.channel.send(gn)
    }
};