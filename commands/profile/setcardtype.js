const userdata = require("../../userdata.json");
const { updateFile } = require("../../functions/updateFile");
const { getcards } = require("./cardstyles/allcards");

module.exports = {
  name: "setcardtype",
  options: {
    args: ["type"],
    neededargs: 0,
    roles: [],
    admincmd: false,
    privatecmd: false,
    avalibleinhelp: true,
  },
  description: "set the user his card type",
  execute(message, args) {
    if (!message.guild) return;
    if (!userdata[message.author.id]) return;

    if (!args.length)
      return message.channel
        .send(
          ":exclamation:You need to specify a type!"
        )
        .then((msg) => {
          msg.delete({ timeout: 10000 });
        });
    let [type] = args;

    const cards = getcards();
    let found = false;

    for (let i = 0; i < cards.length; i++) {
      if(type == cards[i].name){
        found = true;
        userdata[message.author.id].cardtype = cards[i].x;
        updateFile('./userdata.json', userdata);
        message.channel.send(
          `:white_check_mark:set your card theme to: **${cards[i].name}**`
        );
      }
    }
    if(!found){
      message.channel
      .send(
        ":exclamation:You need to specify a correct type!"
      )
      .then((msg) => {
        msg.delete({ timeout: 10000 });
      });
    }
  },
};
