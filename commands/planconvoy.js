const Discord = require('discord.js');

module.exports = {
    name: 'planconvoy',
    options: {
        args : [
            "img URL",
            "dm Type",
            "description",
        ],
        neededargs : 2,
        roles : [
            '705480865785839617'
        ],
        admincmd : true,
        privatecmd : false,
        avalibleinhelp : false
    },
    description: 'plan a convoy',
    execute(message, args) {
        const descriptiontext = args.slice(1).join(" ");
        try {
            const embed = new Discord.MessageEmbed()
            .setDescription(descriptiontext)
            .setColor("#166B9B")
            .setTitle("Koleka Charters NL")
            .setThumbnail('https://cdn.discordapp.com/attachments/1017173449728327701/1017924187756703775/done_koleka_charters.png')
	        .setImage(args[0]);
            message.channel.send(embed)
        } catch (error) {
            message.channel.send("Url not valid!").then(msg => {
                msg.delete({
                    timeout: 1000
                })
            })
        }
    },
    rimind(){

    }
};