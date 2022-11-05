const userdata = require('../../userdata.json');
const config = require('../../bot.config.json');
module.exports = {
    name: 'userlinktmp',
    options: {
      args : [
          "link",
          "user"
      ],
      neededargs : 0,
      roles : [],
      admincmd : false,
      privatecmd : false,
      avalibleinhelp : false
    },
    description: 'link a other user his truckersmp',
    execute(message, args) {
        if (!message.guild) return;
        if (!args.length) return message.channel.send(':exclamation:You need to specify a link!').then(msg => {msg.delete({ timeout: 10000 })})
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send(`:x:You don't have rights to this command! If you are a member try using the command: ${config.General.Prefix}linktmp.`).then(msg => {msg.delete({ timeout: 10000 })});return;}
      if (!args.length) return message.reply(':exclamation:You need to specify a link!')
      const user = message.mentions.users.first() || message.author;
      let [tmp] = args
      if (!tmp.startsWith("https://truckersmp.com/user")) {
        message.channel.send(":exclamation:You Need to specify a correct link!").then(msg => {msg.delete({ timeout: 10000 })});return;}
      if(!userdata[user.id]){
      userdata[user.id] = {
        tmp: 'Not linked',
        tbo: 'Not linked',
        level: 1,
        xp: 0,
        warnings: 0,
        cardtype: 0
     };
     message.channel.send(`:white_check_mark:Truckersmp account linked to ${user.username}`).then(msg => {msg.delete({ timeout: 60000 })})
     return}
     userdata[user.id].tmp = `${tmp}`
     message.channel.send(`:white_check_mark:Truckersmp account linked to ${user.username}`).then(msg => {msg.delete({ timeout: 60000 })})
     fs.writeFile("./userdata.json", JSON.stringify(userdata), (err) => {
        if(err) console.log(err)
      })
      
    }
   
   
};