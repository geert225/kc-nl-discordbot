const config = require('../../bot.config.json');

module.exports = {
    name: 'ga',
    options: {
        args : [],
        neededargs : 0,
        roles : [],
        admincmd : false,
        privatecmd : false,
        avalibleinhelp : true
    },
    description: 'Send a cool gif (ga)',
    execute(message, args) {
        const ga = config.ImageUrl.GA;
        message.channel.send(ga)
    },
   
};