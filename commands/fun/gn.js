const config = require('../../bot.config.json');

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
        const gn = config.ImageUrl.GN;
        message.channel.send(gn)
    }
};