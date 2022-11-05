module.exports = {
    name: 'clear',
    options: {
        args : [
            "Amount",
        ],
        neededargs : 1,
        roles : [],
        admincmd : true,
        privatecmd : false,
        avalibleinhelp : false
    },
    description: 'clear chat messages',
    execute(message, args) {
        const amount = args.join(' ');
        if (!message.guild) return;
        if (!amount) return message.channel.send(':exclamation:You haven\'t given an amount of messages which should be deleted!').then(msg => {msg.delete({ timeout: 60000 })});
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {message.channel.send(":x:You don't have rights to this command!").then(msg => {msg.delete({ timeout: 60000 })});return;}
        if (isNaN(amount)) return message.channel.send(':exclamation:The amount parameter isn`t a number!').then(msg => {msg.delete({ timeout: 60000 })});
        if (amount > 100) return message.channel.send(':exclamation:You can`t delete more than 100 messages at once!').then(msg => {msg.delete({ timeout: 60000 })}); 
        if (amount < 1) return message.channel.send(':exclamation:You have to delete at least 1 message!').then(msg => {msg.delete({ timeout: 60000 })});
        message.channel.messages.fetch({ limit: amount }).then(messages => {
        message.channel.bulkDelete(messages)})
    },
   
};