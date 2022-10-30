const userdata = require('../userdata')
const prefix = process.env.PREFIX
module.exports = {
    name: 'userlinktrucksbook',
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
    description: 'link a other user his trucksbook',
    execute(message, args) {
        if (!message.guild) return;
        if (!args.length) return message.channel.send(':exclamation:You need to specify a link!').then(msg => {msg.delete({ timeout: 10000 })})
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send(`:x:You don't have rights to this command! If you are a member try using the command: ${prefix}linktrucksbook.`).then(msg => {msg.delete({ timeout: 10000 })});return;}
      if (!args.length) return message.reply(':exclamation:You need to specify a link!')
      const user = message.mentions.users.first() || message.author;
      let [tbo] = args
      if (!tbo.startsWith("https://trucksbook.eu/")) {
        message.channel.send(":exclamation:You Need to specify a correct link!").then(msg => {msg.delete({ timeout: 10000 })});return;}
      if(!userdata[user.id]){
      userdata[user.id] = {
        tmp: 'Not linked',
        tbo: `${tbo}`,
        level: 1,
        xp: 0
     };
     message.channel.send(`:white_check_mark:Trucksbook account linked to ${user.username}`).then(msg => {msg.delete({ timeout: 60000 })})
     return}
     userdata[user.id].tbo = `${tbo}`
     message.channel.send(`:white_check_mark:Trucksbook account linked to ${user.username}`).then(msg => {msg.delete({ timeout: 60000 })})
     fs.writeFile("./userdata.json", JSON.stringify(userdata), (err) => {
        if(err) console.log(err)
      })
      
    }
   
   
};