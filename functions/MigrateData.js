const olduserdata = require('./migrationData/userdata.json');
const oldwarning = require('./migrationData/warnings.json');
const oldcard = require('./migrationData/card.json');
let newuserdata = {};

const fs = require('fs');

for (const user in olduserdata) {
    if (Object.hasOwnProperty.call(olduserdata, user)) {
        if(olduserdata[user].tmp != 'Not linked'){
            if(!oldwarning[user]){
                oldwarning[user] = {
                    warnings : 0
                }
            }
            if(!oldcard[user]){
                oldcard[user] = {
                    cardtype : 0
                }
            }
            newuserdata[user] = {
                tmp: olduserdata[user].tmp,
                tbo: olduserdata[user].tbo,
                level: olduserdata[user].level,
                xp: olduserdata[user].xp,
                warnings: oldwarning[user].warnings,
                cardtype: oldcard[user].cardtype
            }
        }
    }
}

fs.writeFile('./newdata.json', JSON.stringify(newuserdata), (err) => {
    if(err) console.log(err)
})