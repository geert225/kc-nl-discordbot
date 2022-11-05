module.exports = {
    name: 'join',
    options: {
      args : [],
      neededargs : 0,
      roles : [],
      admincmd : false,
      privatecmd : false,
      avalibleinhelp : true
    },
    description: 'let the bot join in a voice channel to play music',
    execute(message, args) {
      if (!message.member.voice.channel){message.channel.send(':exclamation:You are not in a voice channel!').then(msg => {msg.delete({ timeout: 10000 })});return;}
      message.member.voice.channel.join()
      message.channel.send(':white_check_mark:Connected to voice channel!');
    }
};