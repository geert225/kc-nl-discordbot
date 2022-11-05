const fs = require('fs');

module.exports = {
    updateFile(file, newdata){
        fs.writeFile(file, JSON.stringify(newdata), (err) => {
            if(err) console.log(err)
        })
    }
}