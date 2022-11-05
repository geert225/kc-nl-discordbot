const card = require('../../card.json');

module.exports = {
    name: 'setcardtype',
    options: {
      args : [
        "type"
      ],
      neededargs : 0,
      roles : [],
      admincmd : false,
      privatecmd : false,
      avalibleinhelp : true
    },
    description: 'set the user his card type',
    execute(message, args) {
       if (!message.guild) return;
       if(!card[message.author.id]){
        card[message.author.id] = {
          cardtype: 0
       }
       console.log(card[message.author.id])
       fs.writeFile("./card.json", JSON.stringify(card), (err) => {
         if(err) console.log(err)
       })
      }
       if (!args.length) return message.channel.send(':exclamation:You need to specify a type! The type\'s that you can choose are: **default**, **comic**, **sunshine**, **gold**, **dct**.').then(msg => {msg.delete({ timeout: 10000 })})
       let [type] = args
       if (type === 'default') {
       message.channel.send(":white_check_mark:set your card theme to: **default**")
       card[message.author.id].cardtype = 0
       fs.writeFile("./card.json", JSON.stringify(card), (err) => {
        if(err) console.log(err)
      })
       }else if (type === 'comic') {
        message.channel.send(":white_check_mark:set your card theme to: **comic**")
        card[message.author.id].cardtype = 1
        fs.writeFile("./card.json", JSON.stringify(card), (err) => {
         if(err) console.log(err)
       })
        }
        else if (type === 'sunshine') {
            message.channel.send(":white_check_mark:set your card theme to: **sunshine**")
            card[message.author.id].cardtype = 2
            fs.writeFile("./card.json", JSON.stringify(card), (err) => {
             if(err) console.log(err)
           })
            }else if (type === 'gold') {
              
              message.channel.send(":white_check_mark:set your card theme to: **gold**")
              card[message.author.id].cardtype = 3
              fs.writeFile("./card.json", JSON.stringify(card), (err) => {
               if(err) console.log(err)
             })
              }
              else if (type === 'KOLEKA') {
              
                message.channel.send(":white_check_mark:set your card theme to: **KOLEKA**")
                card[message.author.id].cardtype = 4
                fs.writeFile("./card.json", JSON.stringify(card), (err) => {
                 if(err) console.log(err)
               })
                }
        else message.channel.send(":exclamation:You need to specify a correct type! The type\'s that you can choose are: **default**, **comic**, **sunshine**, **gold**, **dct**.").then(msg => {msg.delete({ timeout: 10000 })})
   
    
    },
   
};