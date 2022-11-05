const userdata = require("../../userdata.json");
const { updateFile } = require("../../functions/updateFile");

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
          ":exclamation:You need to specify a type! The type's that you can choose are: **default**, **comic**, **sunshine**, **gold**, **kcnl**."
        )
        .then((msg) => {
          msg.delete({ timeout: 10000 });
        });
    let [type] = args;
    if (type === "default") {
      message.channel.send(
        ":white_check_mark:set your card theme to: **default**"
      );
      userdata[message.author.id].cardtype = 0;
      updateFile('./userdata.json', userdata);
    } else if (type === "comic") {
      message.channel.send(
        ":white_check_mark:set your card theme to: **comic**"
      );
      userdata[message.author.id].cardtype = 1;
      updateFile('./userdata.json', userdata);
    } else if (type === "sunshine") {
      message.channel.send(
        ":white_check_mark:set your card theme to: **sunshine**"
      );
      userdata[message.author.id].cardtype = 2;
      updateFile('./userdata.json', userdata);
    } else if (type === "kcnl") {
      message.channel.send(
        ":white_check_mark:set your card theme to: **KOLEKA**"
      );
      userdata[message.author.id].cardtype = 3;
      updateFile('./userdata.json', userdata);
    } else
      message.channel
        .send(
          ":exclamation:You need to specify a correct type! The type's that you can choose are: **default**, **comic**, **sunshine**."
        )
        .then((msg) => {
          msg.delete({ timeout: 10000 });
        });
  },
};
