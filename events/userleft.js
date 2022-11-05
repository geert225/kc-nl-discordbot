const config = require('../bot.config.json')

module.exports = {
    name: 'userleft',
    event:  'guildMemberRemove',
    client: null,
    execute(member){
        console.log(`member id: [${member.id}] left the guild`);
        const channel = member.guild.channels.cache.get(config.Channels.LeaveChannel);
        if (!channel) return;
        channel.send(`${member.user} Left the server`);
    }
};