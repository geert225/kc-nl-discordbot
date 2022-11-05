const fs = require('fs');
const path = require('path');

const config = require('./bot.config.json')

module.exports = class{
    constructor(client, workingDir){
        this.client = client;
        this.prefix = config.General.Prefix;
        this.cmdlist = [];
        this.FindFiles(workingDir);
        for (let i = 0; i < this.cmdlist.length; i++) {
            const command = require(`.\\${this.cmdlist[i]}`);
            this.client.commands.set(command.name, command);
        }
        if (this.client.commands.has("help") && this.client.commands.has("modhelp")) {
            const helpcmd = this.client.commands.get("help");
            const modhelpcmd = this.client.commands.get("modhelp");
            this.client.commands.forEach((cmd) => {
                if (cmd.options.avalibleinhelp) {
                    helpcmd.pushcmd(cmd);
                } else {
                    modhelpcmd.pushcmd(cmd);
                }
            });
        }
        this.client.on('message', this.msgHandeler.bind(this));
    };

    FindFiles(Directory) {
        fs.readdirSync(Directory).forEach((File) => {
          const Absolute = path.join(Directory, File);
          if (fs.statSync(Absolute).isDirectory()) {
            return this.FindFiles(Absolute);
          } else if (File.endsWith(".js")) {
            this.cmdlist.push(Absolute);
          }
        });
    };

    async msgHandeler(msg) {
        if (msg.author.bot) return;
        if (this.client.commands.has("planconvoy")) {
          const planner = this.client.commands.get("planconvoy");
          if (planner.commandActive) {
            if (planner.activeUser == msg.author.id) {
              planner.messageExtension(msg);
              return;
            }
          }
        }
        if (!msg.content.startsWith(this.prefix)) return;
        const args = msg.content.slice(this.prefix.length).trim().split(/ +/);
        const command = args.shift().toLocaleLowerCase();
        if (!this.client.commands.has(command)) return;
        try {
          let cmd = this.client.commands.get(command);
          if (!cmd.options.privatecmd && !msg.guild) return;
          if (cmd.options.privatecmd && msg.guild) return;
          if (msg.author.id != 491565735529807872) {
            if (
              cmd.options.admincmd &&
              !msg.member.hasPermission("ADMINISTRATOR")
            ) {
              msg.channel
                .send(":exclamation:You don't have rights to this command!")
                .then((msg) => {
                  msg.delete({
                    timeout: 2000,
                  });
                });
              return;
            }
          }
          if (
            cmd.options.roles.length > 0 &&
            !msg.member.hasPermission("ADMINISTRATOR")
          ) {
            let result = false;
            if (msg.guild.members.cache.has(msg.author.id)) {
              let member = msg.guild.members.cache.get(msg.author.id);
              cmd.options.roles.forEach((role) => {
                if (member.roles.cache.has(role)) {
                  result = true;
                }
              });
            }
            if (!result) {
              msg.channel
                .send(
                  ":warning: You dont have the correct role to execute this command!"
                )
                .then((msg) => {
                  msg.delete({
                    timeout: 2000,
                  });
                });
              return;
            }
          }
          if (args.length < cmd.options.neededargs) {
            msg.channel
              .send(":warning: You did not specifie all arguments!")
              .then((msg) => {
                msg.delete({
                  timeout: 2000,
                });
              });
            return;
          }
          cmd.execute(msg, args);
        } catch (error) {
          console.error(error);
          msg.reply(":exclamation:There was an issue executing that command!");
        }
      };
}