const express = require('express');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const config = require('./bot.config.json');
const PORT = 8000;
const reg = require('./reg.json')
const fs = require('fs');

module.exports = (client)=>{
    const app = express();

    app.use( express.json() );

    app.post('/registration', async(req, res)=>{
        const reqdata = req.body
        try {
            const tmpid = reqdata.tmpli.split('/').pop();
            const trucksmpresponse = await fetch(`https://api.truckersmp.com/v2/player/${tmpid}`);
            const trucksmpdata = await trucksmpresponse.json();
            if(trucksmpdata.error){
                res.status(202).send('could not find user on truckersmp');
                return;
            }
            if(trucksmpdata.response.banned){
                res.status(202).send('user is banned on truckersmp');
                return;
            }            
            if(trucksmpdata.response.vtc.inVTC){
                res.status(202).send('user is already in a vtc');
                return;
            }
            const user = client.users.cache.find(u => u.tag === reqdata.discord)
            if(!user){
                res.status(202).send('discord user not found');
                return;
            }
            const registration = {
                state : 'pending',
                name : reqdata.name,
                truckersmpid : tmpid,
                discordid : user.id,
                msg: reqdata.msg
            }
            reg.data.push(registration);
            fs.writeFileSync('./reg.json', JSON.stringify(reg));
            
            res.status(200).send('registation succes');
            
            const message = new MessageEmbed()
            .setTitle(`Thanks for you registation to Koleka Charters NL!`)
            .setColor(config.Colors.MainEmbed)
            .setDescription(`${registration.name} you registation will now be reviewed!\nYou can join our discord via this link:\n${config.General.discordurl}`)
            .setThumbnail(config.ImageUrl.Logo)
            .setImage(config.ImageUrl.Reistation)
            .setFooter(config.General.FooterText, '')
            .setTimestamp()
            user.send(message);

            const registrationmessage = new MessageEmbed()
            .setTitle(`User ${registration.name} has applyed to the vtc`)
            .setColor(config.Colors.MainEmbed)
            .setDescription(`${registration.name} you registation will now be reviewed!\nYou can join our discord via this link:\n${config.General.discordurl}`)
            .setTimestamp()

        } catch (error) {
            console.log(error);
            res.status(500).send('request canceled by internal error in server')
        }
    })

    app.listen(PORT, () =>
    console.log(`registation API Running on port ${PORT}!`),
    );
}