const config = require('../../bot.config.json');

module.exports = {
    name: 'gm',
    options: {
        args : [],
        neededargs : 0,
        roles : [],
        admincmd : false,
        privatecmd : false,
        avalibleinhelp : true
    },
    description: 'Send a cool gif (gm)',
    execute(message, args) {
        const gm = config.ImageUrl.GM;
        message.channel.send(gm)
    },
   
};