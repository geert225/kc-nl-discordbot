const userdata = require('../userdata.json');
const { updateFile } = require('../functions/updateFile');

module.exports = {
    name: 'inituser',
    event:  'message',
    client: null,
    async execute(msg){
        if (msg.author.bot) return;
        if(!userdata[msg.author.id]){
            //Init data for new user
            userdata[msg.author.id] = {
                tmp: 'Not linked',
                tbo: 'Not linked',
                level: 1,
                xp: 0,
                warnings: 0,
                cardtype: 0
            }
            updateFile('./userdata.json', userdata);
        }
    }
};