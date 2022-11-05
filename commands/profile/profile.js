const userdata = require("../../userdata.json");
const { MessageEmbed } = require("discord.js");
const { updateFile } = require("../../functions/updateFile");
const config = require("../../bot.config.json");

module.exports = {
  name: "profile",
  options: {
    args: ["User"],
    neededargs: 0,
    roles: [],
    admincmd: false,
    privatecmd: false,
    avalibleinhelp: true,
  },
  description: "show your profile",
  execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    if (!userdata[user.id]) {
      userdata[user.id] = {
        tmp: "Not linked",
        tbo: "Not linked",
        level: 1,
        xp: 0,
        warnings: 0,
        cardtype: 0,
      };
      updateFile("./userdata.json", userdata);
    }
    const embed = new MessageEmbed()
      .setColor(config.Colors.MainEmbed)
      .setThumbnail(user.displayAvatarURL())
      .setImage(config.ImageUrl.UserProfile)
      .setTitle(`Profile of ${user.username}`)
      .setURL("https://trucksbook.eu/company/157826/")
      .addFields(
        { name: "Discord name:", value: `${user.username}` },
        { name: "Truckersmp:", value: `:link: ${userdata[user.id].tmp}` },
        { name: "Trucksbook:", value: `:link: ${userdata[user.id].tbo}` }
      )
      .setTimestamp()
      .setFooter(config.General.FooterText, "");
    message.channel.send(embed);
  }
};
