const fs = require('fs');
const path = require('path');
const config = require('./bot.config.json')

module.exports = class{
    constructor(client, workingDir){
        this.client = client;
        this.eventlist = [];
        this.FindFiles(workingDir);
        for (let i = 0; i < this.eventlist.length; i++) {
            const event = require(`${((config.SYSTEM == 'WIN') ? '.\\' : './')}${this.eventlist[i]}`);
            this.client.events.set(event.name, event);
            event.client = this.client
            this.client.on(event.event, event.execute.bind(event))
        }
    }

    FindFiles(Directory) {
        fs.readdirSync(Directory).forEach((File) => {
          const Absolute = path.join(Directory, File);
          if (fs.statSync(Absolute).isDirectory()) {
            return this.FindFiles(Absolute);
          } else if (File.endsWith(".js")) {
            this.eventlist.push(Absolute);
          }
        });
    };
}