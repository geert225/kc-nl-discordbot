const userdata = require('../../userdata.json');
const { updateFile } = require('../../functions/updateFile')
module.exports = {
    name: 'linktmp',
    options: {
      args : [
          "link",
      ],
      neededargs : 0,
      roles : [],
      admincmd : false,
      privatecmd : false,
      avalibleinhelp : true
    },
    description: 'Link your truckermp page to profile',
    execute(message, args) {
      if(!userdata[message.author.id]) return message.channel.send(':exclamation:Youy dont hava any userdata try to send a noraml message!').then(msg => {msg.delete({ timeout: 10000 })})
        if (!args.length) return message.channel.send(':exclamation:You need to specify a link!').then(msg => {msg.delete({ timeout: 10000 })})
        let [tmp] = args
        if (!tmp.startsWith("https://truckersmp.com/user")) {
          message.channel.send(":exclamation:You Need to specify a correct link!").then(msg => {msg.delete({ timeout: 10000 })});return;}
        message.channel.send(`:white_check_mark:Truckersmp account linked`).then(msg => {msg.delete({ timeout: 60000 })})
        userdata[message.author.id].tmp = `${tmp}`
        updateFile('./userdata.json', userdata);
    },
   
};