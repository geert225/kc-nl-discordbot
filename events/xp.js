const userdata = require('../userdata.json');
const { updateFile } = require('../functions/updateFile');

const config = require('../bot.config.json');

module.exports = {
    name: 'xp',
    event:  'message',
    client: null,
    async execute(msg){
        if (msg.author.bot) return;
        if(!userdata[msg.author.id])return;
        if(msg.content.startsWith(config.General.Prefix)) return;
        if(config.Guild.ID != msg.guild.id) return;
        const addedXp = this.generateRambomxp();
        const curlvl = userdata[msg.author.id].level;
        const curxp = userdata[msg.author.id].xp;
        const nextlvl = userdata[msg.author.id].level * 800;
        userdata[msg.author.id].xp = curxp + addedXp;
        if(userdata[msg.author.id].xp >= nextlvl){
            userdata[msg.author.id].level = curlvl + 1;
        }
        updateFile('./userdata.json', userdata);
    },
    generateRambomxp(){
        const min = 1;
        const max = 12;
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
};