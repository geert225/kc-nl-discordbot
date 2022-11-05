module.exports = {
    name: 'ban',
    options: {
      args : [
          "User",
      ],
      neededargs : 0,
      roles : [],
      admincmd : true,
      privatecmd : false,
      avalibleinhelp : false
    },
    description: 'ban a user',
    execute(message, args) {
        const user = message.mentions.users.first();
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send(":x:You don't have rights to this command!").then(msg => {msg.delete({ timeout: 10000 })});return;}
            if (user) {
                const member = message.guild.members.resolve(user);
                if (member) {
          
                  member
                    .ban({
                      reason: 'bot ban',
                    })
                    .then(() => {
                       message.channel.send(`:white_check_mark:Successfully banned ${user.tag}`);
                    })
                    .catch(err => {
                       message.channel.send(':x:I was unable to ban the member.').then(msg => {msg.delete({ timeout: 10000 })});return;
                      console.error(err);
                    });
                } else {
                 message.channel.send(":exclamation:You didn't mention the user or that user isn't in this guild!").then(msg => {msg.delete({ timeout: 10000 })});return;
                }
              }else {
                message.channel.send(":exclamation:You didn't mention any user!").then(msg => {msg.delete({ timeout: 10000 })});return;
              }
    },
   
};