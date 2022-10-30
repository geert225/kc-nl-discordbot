const Discord = require('discord.js');
const client = new Discord.Client();
const userdata = require('./userdata');
const warnings = require('./warnings');
const card = require('./card')
const fs = require("fs");
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
require('dotenv-flow').config();

//env file uitlezen
const config = {
  token: process.env.TOKEN,
  owner: process.env.OWNER,
  prefix: process.env.PREFIX,
  welkom: process.env.WELKOM,
  Welkomf: process.env.WELKOMF,
  welkomcolor: process.env.EMBEDWELKOMCOLOR,
  helpembedcolor: process.env.HELPEMBEDCOLOR,
  leave: process.env.LEAVE,
  guildidmain: process.env.GUILDIDMAIN,
  guildidf: process.env.GUILDIDF
};

/*
  Command register service
*/
//cmd handeler v2
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//register commands in help menu
if(client.commands.has('help') && client.commands.has('modhelp')){
  const helpcmd = client.commands.get('help');
  const modhelpcmd = client.commands.get('modhelp');
  client.commands.forEach(cmd => {
    if(cmd.options.avalibleinhelp){
      helpcmd.pushcmd(cmd);
    }else{
      modhelpcmd.pushcmd(cmd);
    }
  });
} 

/*
  Command executing service service
*/
//cmd executer v2
client.on('message', async (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLocaleLowerCase();
  if (!client.commands.has(command)) return;
  try {
    let cmd = client.commands.get(command)
    if(!cmd.options.privatecmd && !message.guild) return;
    if(cmd.options.privatecmd && message.guild) return;
    if(message.author.id != 491565735529807872){
      if(cmd.options.admincmd && !message.member.hasPermission("ADMINISTRATOR")){
        message.channel.send(":exclamation:You don't have rights to this command!").then(msg => {
          msg.delete({
              timeout: 2000
          })
        })
        return;
      }
    }
    if(cmd.options.roles.length > 0 && !message.member.hasPermission("ADMINISTRATOR")){
      let result = false;
      if(message.guild.members.cache.has(message.author.id)){
          let member = message.guild.members.cache.get(message.author.id)
          cmd.options.roles.forEach(role => {
            if(member.roles.cache.has(role)){
              result = true;
            }
          })
      }
      if(!result){
        message.channel.send(":warning: You dont have the correct role to execute this command!").then(msg => {
          msg.delete({
              timeout: 2000
          })
        })
        return;
      }
    }
    if(args.length < cmd.options.neededargs){
      message.channel.send(":warning: You did not specifie all arguments!").then(msg => {
        msg.delete({
            timeout: 2000
        })
      })
      return;
    }
    cmd.execute(message, args, color);
  }catch (error) {
    console.error(error);
    message.reply(':exclamation:There was an issue executing that command!')
  }
})




//console praatjes
client.on('ready', () => {
  console.log('bot online!');
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`Looking for Koleka problems | ${prefix}help`, { type: 'PLAYING' });
});

//pefix zetten
const prefix = config.prefix;
//config.name naar const convert
const welkom = '1004000886932131841'
const welkomf = '1004000886932131841'
const welkomcolor = config.welkomcolor;
const color = config.helpembedcolor;
const welkomimage = 'https://cdn.discordapp.com/attachments/740944420484022283/1032632887146721320/www.KolekaChartersVTC.nl_5.gif';
const logo = 'https://cdn.discordapp.com/attachments/1017173449728327701/1017924187756703775/done_koleka_charters.png'
const leave = config.leave
const role1 = '1004108639054864414'
const role2 = '0'
const role1f = '1004108639054864414'
const dcmain = '1004000886932131841'
const dcfriends = '696019111888814160'
const levelup = '759805880459591700'
var isReady = true;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLocaleLowerCase();

  if (!client.commands.has(command)) return;
  /*
  try {
    //client.commands.get(command).execute(message, args, color);
  }catch (error) {
    console.error(error);
    message.reply(':exclamation:There was an issue executing that command!')
  }
  */
  if(!userdata[message.author.id]){
    userdata[message.author.id] = {
      tmp: 'Not linked',
      tbo: 'Not linked',
      level: 1,
      xp: 0
   }
   console.log(userdata[message.author.id])
   fs.writeFile("./userdata.json", JSON.stringify(userdata), (err) => {
     if(err) console.log(err)
   })
 }
 if(!warnings[message.author.id]){
   warnings[message.author.id] = {
     warnings: 0
  }
  console.log(warnings[message.author.id])
  fs.writeFile("./warnings.json", JSON.stringify(warnings), (err) => {
    if(err) console.log(err)
  })
}
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('guildMemberAdd', member => {
  console.log(`member id: [${member.id}] joined the guild ${member.guild.id}`);
  const guild = member.guild.id;
  if(guild === dcmain ){
    const channel = member.guild.channels.cache.get(welkom);
    if (!channel) return;
    let joinembed = new Discord.MessageEmbed()
    .setTitle(`Welcome to Koleka Charters NL!`)
    .setColor(welkomcolor)
    .setDescription(`Welcome ${member.user} \nBefore you start, read the rules and other information! \nIf you have any questions, please let us know.\n\nWith best regards,\nKoleka Charters NL `)
    .setThumbnail(logo)
    .setImage(welkomimage)
    .addField('Total members', member.guild.memberCount, false)
    .setFooter('©Koleka Charters 2022-2023', '')
    .setTimestamp()
  
  member.roles.add(role1);
  member.roles.add(role2);
  member.send(`Welcome ${member.user} to Koleka Charters NL!\nBefore you start, read the rules and other information!\nIf you have any questions, please let us know.\n\nWith best regards,\n Koleka Charters NL`)
  channel.send(joinembed);
  }
  else if(guild === '1004000885740941354' ){
    const channel = member.guild.channels.cache.get(welkomf);
    if (!channel) return;
    let join2embed = new Discord.MessageEmbed()
    .setColor(welkomcolor)
    .setDescription(`Welcome by Koleka Charters NL ${member.user} , Before you start, read all the information and rules. If there are any questions, you can go to <#1017110505170686003> `)
    .setThumbnail(logo)
    .setImage(welkomimage)
    .addField('Total members', member.guild.memberCount, false)
    .setFooter('©Koleka Charters 2022-2023', '')
    .setTimestamp()
  
  member.roles.add(role1f);
  channel.send(join2embed);
  }
  
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('guildMemberRemove', member => {
  console.log(`member id: [${member.id}] left the guild`);
  const channel = member.guild.channels.cache.get(leave);
  if (!channel) return;

  let leaveembed = new Discord.MessageEmbed()
  .setColor(welkomcolor)
  .setDescription(`${member.user} Left the server `)
  .setFooter('©Koleka Charters 2022-2023', '')
  .setTimestamp()
  channel.send(leaveembed);
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("guildCreate", guild => {
  guild.owner.send(`Thanks! You can use ${prefix}help and ${prefix}modhelp to discover commands.`);
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', async (message) => {
  // change status
   if (message.content.startsWith(`${prefix}changestatus`)) {
    if (message.author.bot) return
    if (!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send("You don't have rights to this command!").then(msg => {msg.delete({ timeout: 60000 })});return;}
  if (command === 'changestatus') {
    if (!args.length) return message.reply('You need to specify a status!')
    const [activityf] = args
    message.channel.send(`Set bot status to ${activityf}`)
    client.user.setActivity(``, { type: 'Looking for' });
  }}else if (message.content === `${prefix}resetstatus`) {
    if (message.author.bot) return
    if (!message.guild) return;
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send("You don't have rights to this command!").then(msg => {msg.delete({ timeout: 60000 })});return;}
      client.user.setActivity(`koleka problem | ${prefix}help`, { type: 'Looking for' });
    message.channel.send("Bots status reset to default!").then(msg => {msg.delete({ timeout: 60000 })});return;
  }
})
//say commands
client.on('message', message => {
  if(message.author.bot) return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.content.startsWith(prefix + 'say'))
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

client.on('message', async (message) => {
if(!card[message.author.id]){
  card[message.author.id] = {
    cardtype: 0
 }
 console.log(card[message.author.id])
 fs.writeFile("./card.json", JSON.stringify(card), (err) => {
   if(err) console.log(err)
 })
}})






client.login(config.token);