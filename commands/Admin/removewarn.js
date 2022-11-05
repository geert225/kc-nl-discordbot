const userdata = require('../../userdata.json');
const { updateFile } = require('../../functions/updateFile');

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
        if (!message.member.hasPermission("KICK_MEMBERS")) { message.channel.send(":x:You don't have rights to this command!").then(msg => {msg.delete({ timeout: 10000 })});return;}
        const target = message.mentions.users.first()
        if (!target) {
           message.channel.send(':exclamation:Please specify someone to remove a warn from.').then(msg => {msg.delete({ timeout: 10000 })});return;
        }
        args.shift()
        const warnamount = Math.floor(userdata[target.id].warnings) - 1
        message.author.send(`:white_check_mark: Removed a warn. ${target} has now ${warnamount} warnings.`)
        userdata[target.id].warnings = warnamount
        updateFile('./userdata.json', userdata);
    }
};