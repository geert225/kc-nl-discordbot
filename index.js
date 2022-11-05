const Discord = require('discord.js');
const client = new Discord.Client();

//const card = require('./card')
const fs = require("fs");
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
require('dotenv-flow').config();
const commandHandler = require('./commandHandler');
const eventHandler = require('./eventHandler');
const config = require('./bot.config.json')

cmdhandeler = new commandHandler(client, './commands');
eventhandeler = new eventHandler(client, './events');

/*
if(message.guild.id === '1004000885740941354'){
 if (message.author.bot) return;
 if (!message.guild) return;
let xpadd = Math.floor(Math.random() * 7) + 12;
const channel = message.guild.channels.cache.get(levelup);

let curxp = userdata[message.author.id].xp;
let curlvl = userdata[message.author.id].level;
let nxtlvl = userdata[message.author.id].level * 800;
userdata[message.author.id].xp = curxp + xpadd;
if(nxtlvl <= userdata[message.author.id].xp){
 userdata[message.author.id].level = curlvl +1;
 //message.guild.channels.cache.get(levelup).send(`${message.author}, You have leveld up! New level:**${curlvl}**`)
}
fs.writeFile("./userdata.json", JSON.stringify(userdata), (err) => {
 if(err) console.log(err)}
 )
}
});
*/

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