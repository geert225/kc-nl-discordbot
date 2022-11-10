const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
require('dotenv-flow').config();
const commandHandler = require('./commandHandler');
const eventHandler = require('./eventHandler');
const config = require('./bot.config.json')
const cmdhandler = new commandHandler(client, './commands');
const evnthandler = new eventHandler(client, './events');
const registationapi = require('./apihandler');

//say commands
client.on('message', message => {
  if(message.author.bot) return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.content.startsWith(config.General.Prefix + 'say'))
  {
    const args = message.content.slice(4).split(" ");
    const saymessage = args.join(" ");
    const embedsay = new Discord.MessageEmbed()
    .setDescription(saymessage)
    .setColor("#166B9B")
    .setTitle("Koleka Charters NL") //title
    .setThumbnail('https://cdn.discordapp.com/attachments/1017173449728327701/1017924187756703775/done_koleka_charters.png') //logo
	.setImage('https://cdn.discordapp.com/attachments/740944420484022283/1035962643237851216/hween.png')	//picture aan de onderkant
    //.setFooter(' ')  // picture op het bodem
  message.channel.send(embedsay);
  message.delete().catch(O => {});
  }
});

client.login(process.env.TOKEN);
registationapi(client);