const userdata = require('../userdata');
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
        if (!args.length) return message.channel.send(':exclamation:You need to specify a link!').then(msg => {msg.delete({ timeout: 10000 })})
        let [tmp] = args
        if (!tmp.startsWith("https://truckersmp.com/user")) {
          message.channel.send(":exclamation:You Need to specify a correct link!").then(msg => {msg.delete({ timeout: 10000 })});return;}
        message.channel.send(`:white_check_mark:Truckersmp account linked`).then(msg => {msg.delete({ timeout: 60000 })})
        userdata[message.author.id].tmp = `${tmp}`
        fs.writeFile("./userdata.json", JSON.stringify(userdata), (err) => {
        if(err) console.log(err)
    })
    },
   
};