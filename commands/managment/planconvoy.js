const Discord = require('discord.js');
const urlchecker = require('../../functions/urlchecker');
const role = '1004116254304505997';
const config = require('../../bot.config.json')

const defaultdata = {
    ID: "",
    IMG: "",
    MSG: 0, //1 = all , 2=vtc, 3= 
};

module.exports = {
    name: 'planconvoy',
    options: {
        args : [
            "img URL",
            "channel ID",
            "dm Type",
            "description",
        ],
        neededargs : 0,
        roles : [
            "1004000886131003465"
        ],
        admincmd : false,
        privatecmd : false,
        avalibleinhelp : false
    },
    description: '__Img URL:__ link naar het plaatje onder bericht,\n__dm Type:__ \n    none (niemand krijgt het bericht in de dm)\n    vtc (alle personen met de vtc rol krijgen een dm)\n    all (iedereen krijt een bericht in dm)\n__channel ID:__ ID van kanaal waar hoofd bericht wordt geplaatst,\n__description:__ text wat in het bericht moet staan',
    execute(message, args) {
        message.channel.send("Starting a new convoy plan, type *cancel* to stop all actions");
        message.channel.send("Type the ID of the channel were to put the message");
        this.activeUser = message.author.id;
        this.commandActive = true;
        this.shareddata = {
            ID: "",
            IMG: "",
            MSG: 0, //1 = all , 2=vtc, 3= 
        };
    },
    messageExtension(message){
        const msg = message.content.toLocaleLowerCase();
        if(msg == "cancel"){
            this.shareddata = {
                ID: "",
                IMG: "",
                MSG: 0, //1 = all , 2=vtc, 3= 
            };
            this.activeUser = "";
            this.commandActive = false;
            return;
        }
        if(this.shareddata.ID == ""){
            if(!message.guild.channels.cache.has(msg)){
                message.channel.send(":exclamation: Channel is incorrect!").then(msg => {
                    msg.delete({
                        timeout: 10000
                    })
                })
                return;
            }
            this.shareddata.ID = msg;
            message.channel.send("Type the URL of the image to put on the message");
            return;
        }
        if(this.shareddata.IMG == ""){
            if(!urlchecker(msg)){
                message.channel.send(":exclamation: Url not valid!").then(msg => {
                    msg.delete({
                        timeout: 10000
                    })
                })
                return;
            }
            this.shareddata.IMG = msg;
            message.channel.send("who needs to get a dm ( all, vtc, none )");
            return;
        }
        if(this.shareddata.MSG == 0){
            if(msg != "all" && msg != "vtc" && msg != "none"){
                message.channel.send(":exclamation: You must specifie the correct message type: *all* (All members get a dm), *vtc* (All vtc members get a dm), *none* (no one gets a dm)").then(msg => {
                    msg.delete({
                        timeout: 10000
                    })
                })
                return;
            }
            if(msg == "all") this.shareddata.MSG = 1;
            if(msg == "vtc") this.shareddata.MSG = 2;
            if(msg == "none") this.shareddata.MSG = 3;
            message.channel.send("specifie the text to be in the message");
            return;
        }
        message.channel.send("message complete! it wil now be sent");

        const embed = new Discord.MessageEmbed()
        .setDescription(message.content)
        .setColor(config.Colors.MainEmbed)
        .setTitle("Koleka Charters NL")
        .setThumbnail(config.ImageUrl.Logo)
	    .setImage(this.shareddata.IMG);

        const sendchannel = message.guild.channels.cache.get(this.shareddata.ID);
        sendchannel.send(embed)

        if(this.shareddata.MSG == 1){
            message.guild.members.cache.forEach(user => {
                if(!user.user.bot){
                    user.user.send(embed);
                } 
            });
        }
        if(this.shareddata.MSG == 2){
            message.guild.members.cache.forEach(user => {
                if(!user.user.bot && user.roles.cache.has(config.Roles.Member)){
                    user.user.send(embed);
                } 
            });
        }

        this.activeUser = "";
        this.commandActive = false;
        this.shareddata = {
            ID: "",
            IMG: "",
            MSG: 0, //1 = all , 2=vtc, 3= 
        }
        
    },
    shareddata : {
        ID: "",
        IMG: "",
        MSG: 0, //1 = all , 2=vtc, 3= 
    },
    activeUser : "",
    commandActive : false,
    timeout : null
};