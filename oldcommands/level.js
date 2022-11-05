const userdata = require('../../userdata.json');
const card = require('../../card.json');
const canvacord = require("canvacord");
module.exports = {
    name: 'level',
    options: {
      args : [
          "User",
      ],
      neededargs : 0,
      roles : [],
      admincmd : false,
      privatecmd : false,
      avalibleinhelp : true
    },
    description: 'show your level banner',
    execute(message, args){
       const user = message.mentions.users.first() || message.author
       let nxtlvl = userdata[message.author.id].level * 800;
       if(!userdata[user.id]) {
        message.channel.send(':exclamation:user has no xp! try sending a message.').then(msg => {msg.delete({ timeout: 10000 })});return;
       }
       if(!card[message.author.id]){
        card[message.author.id] = {
          cardtype: 0
       }
       console.log(card[message.author.id])
       fs.writeFile("./card.json", JSON.stringify(card), (err) => {
         if(err) console.log(err)
       })
      }
       if(card[user.id].cardtype === 0){
        const rank = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png'}))
        .setCurrentXP(userdata[user.id].xp)
        .setRequiredXP(nxtlvl)
        .setProgressBar('#166b9b', "COLOR")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setLevel(userdata[user.id].level)
      rank.build()
      .then(data =>{
          const att =new Discord.MessageAttachment(data, 'card.png')
          message.channel.send(att)
      })}
       else if(card[user.id].cardtype === 1){
        const rank = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png'}))
        .setCurrentXP(userdata[user.id].xp)
        .setRequiredXP(nxtlvl)
        .setProgressBar('#c2c2c2', "COLOR")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setLevel(userdata[user.id].level)
        .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/699698617602277488/1029087022394118214/b1.png")
      rank.build()
      .then(data =>{
          const att =new Discord.MessageAttachment(data, 'card.png')
          message.channel.send(att)
      })}
       else if(card[user.id].cardtype === 2){
        const rank = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png'}))
        .setCurrentXP(userdata[user.id].xp)
        .setRequiredXP(nxtlvl)
        .setProgressBar('#FFFFFF', "COLOR")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setLevel(userdata[user.id].level)
        .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/699698617602277488/1029087059404660766/b2.png")
      rank.build()
      .then(data =>{
          const att =new Discord.MessageAttachment(data, 'card.png')
          message.channel.send(att)
      })
       
        
       }else if(card[user.id].cardtype === 3){
        const bar1 =['#D4AF37','#FFD700','D7BE69','B79906']
        const rank = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png'}))
        .setCurrentXP(userdata[user.id].xp)
        .setRequiredXP(nxtlvl)
        .setProgressBar(bar1, 'GRADIENT', true)
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setLevel(userdata[user.id].level)
        //.setBackground("IMAGE", "https://cdn.discordapp.com/attachments/790905868202934312/794228046600077342/gold.png")
        .setOverlay('#FFFFFF', '0', false)
        
      rank.build()
      .then(data =>{
          const att =new Discord.MessageAttachment(data, 'card.png')
          message.channel.send(att)
      })
       
        
       }else if(card[user.id].cardtype === 4){
        const bar2 =['#166b9b','#820000']
        const rank = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png'}))
        .setCurrentXP(userdata[user.id].xp)
        .setRequiredXP(nxtlvl)
        .setProgressBar('#166b9b', "COLOR")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setLevel(userdata[user.id].level)
        //.setBackground("IMAGE", "https://cdn.discordapp.com/attachments/790905868202934312/794241425633050654/sctheame.png")
      rank.build()
      .then(data =>{
          const att =new Discord.MessageAttachment(data, 'card.png')
          message.channel.send(att)
      })
       
        
       }

    }
};