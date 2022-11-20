const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
const config = require("../../bot.config.json");
const userdata = require("../../userdata.json");
const { getcards } = require("./cardstyles/allcards");

module.exports = {
  name: "level",
  options: {
    args: ["User"],
    neededargs: 0,
    roles: [],
    admincmd: false,
    privatecmd: false,
    avalibleinhelp: true,
  },
  description: "show your level banner",
  execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    let xpsubtracktor = (userdata[message.author.id].level * 800)-800;
    if(xpsubtracktor <= 0) xpsubtracktor = 0;
    if (!userdata[user.id]) {
      message.channel
        .send(":exclamation:user has no xp! try sending a message.")
        .then((msg) => {
          msg.delete({ timeout: 10000 });
        });
      return;
    }
    let markup;

    let cards = getcards();
    let found = false;
    for (let i = 0; i < cards.length; i++) {
      if(userdata[user.id].cardtype == cards[i].x){
        markup = cards[i];
        found = true;
      }
      
    }
    if(!found) return;

    let rank;
    if (markup.useimg) {
      rank = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setCurrentXP(userdata[user.id].xp - xpsubtracktor)
        .setRequiredXP(800)
        .setProgressBar(markup.color, "COLOR")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setLevel(userdata[user.id].level)
        .setBackground("IMAGE", markup.img);
    } else {
      rank = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setCurrentXP(userdata[user.id].xp - xpsubtracktor)
        .setRequiredXP(800)
        .setProgressBar(markup.color, "COLOR")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setLevel(userdata[user.id].level);
    }

    rank.build().then((data) => {
      const att = new MessageAttachment(data, "card.png");
      message.channel.send(att);
    });
  },
};
