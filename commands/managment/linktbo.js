const userdata = require('../../userdata.json');
const { updateFile } = require('../../functions/updateFile')
module.exports = {
    name: 'linktrucksbook',
    options: {
      args : [
          "Link",
      ],
      neededargs : 0,
      roles : [],
      admincmd : false,
      privatecmd : false,
      avalibleinhelp : true
    },
    description: 'Link your truckbook page to profile',
    execute(message, args) {
      if(!userdata[message.author.id]) return message.channel.send(':exclamation:Youy dont hava any userdata try to send a noraml message!').then(msg => {msg.delete({ timeout: 10000 })})
      if (!args.length) return message.channel.send(':exclamation:You need to specify a link!').then(msg => {msg.delete({ timeout: 10000 })})
      let [tbo] = args
      if (!tbo.startsWith("https://trucksbook.eu/")) {
        message.channel.send(":exclamation:You Need to specify a correct link!").then(msg => {msg.delete({ timeout: 10000 })});return;}
      message.channel.send(`:white_check_mark:Trucksbook account linked`).then(msg => {msg.delete({ timeout: 60000 })})
      userdata[message.author.id].tbo = `${tbo}`
      updateFile("./userdata.json", userdata)
    },
   
};