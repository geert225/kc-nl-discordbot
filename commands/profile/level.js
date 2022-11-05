const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
const config = require("../../bot.config.json");
const userdata = require("../../userdata.json");

const cardtype_comic = require("./cardstyles/comic.json");
const cardtype_default = require("./cardstyles/default.json");
const cardtype_sunshine = require("./cardstyles/sunshine.json");
const cardtype_koleka = require("./cardstyles/koleka.json");

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
    let nxtlvl = userdata[message.author.id].level * 800;
    if (!userdata[user.id]) {
      message.channel
        .send(":exclamation:user has no xp! try sending a message.")
        .then((msg) => {
          msg.delete({ timeout: 10000 });
        });
      return;
    }
    let markup;
    switch (userdata[user.id].cardtype) {
      case 0:
        markup = cardtype_default;
        break;
      case 1:
        markup = cardtype_comic;
        break;
      case 2:
        markup = cardtype_sunshine;
        break;
      case 3:
        markup = cardtype_koleka;
        break;
      default:
        return;
    }
    let rank;
    if (markup.useimg) {
      rank = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setCurrentXP(userdata[user.id].xp)
        .setRequiredXP(nxtlvl)
        .setProgressBar(markup.color, "COLOR")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setLevel(userdata[user.id].level)
        .setBackground("IMAGE", markup.img);
    } else {
      rank = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setCurrentXP(userdata[user.id].xp)
        .setRequiredXP(nxtlvl)
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
