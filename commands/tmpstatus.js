const Discord = require('discord.js');
const fetch = require('node-fetch');
const color = '166b9b'

module.exports = {
    name: 'tmpstate',
    options: {
        args : [
            "game",
        ],
        neededargs : 0,
        roles : [],
        admincmd : false,
        privatecmd : false,
        avalibleinhelp : true

    },
    description: 'Get the state of a truckersmp server',
    async execute(message, args) {
        if(args < 1) args[0] = 'ets2';
        if(args[0] != 'ets2' && args[0] != 'ats' && args[0] != 'event'){
            message.channel.send(`:warning: ${args[0]} is not a correct game type!`).then(msg => {
                msg.delete({
                    timeout: 2000
                })
              })
              return;
        }

        const response = await fetch("https://api.truckersmp.com/v2/servers");
        const data = await response.json();
        let title = args[0]
        let fields = []
        
        data.response.forEach(serverState => {
            if(args[0] != 'event'){
                if(serverState.game == args[0].toUpperCase() && !serverState.event){
                    fields.push({
                        name: `${serverState.name}  ` + ((serverState.online) ? '[:green_circle:]' : '[:red_circle:]'),
                        value: `${serverState.players} / ${serverState.maxplayers}`
                    })
                }
            }else{
                if(serverState.event){
                    fields.push({
                        name: `${serverState.name}  ` + ((serverState.online) ? '[:green_circle:]' : '[:red_circle:]'),
                        value: `${serverState.players} / ${serverState.maxplayers}`
                    })
                }
            }
        });

        const embed = new Discord.MessageEmbed()
        .setTitle(`Truckersmp ${title} server status`)
        .setColor(color)
        .setFooter('©Koleka Charters NL 2022-2023', '')
        .addFields(fields)
        .setTimestamp(Date.now());
        message.channel.send(embed);
    }
};