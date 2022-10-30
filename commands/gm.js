module.exports = {
    name: 'gm',
    options: {
        args : [],
        neededargs : 0,
        roles : [],
        admincmd : false,
        privatecmd : false,
        avalibleinhelp : true
    },
    description: 'Send a cool gif (gm)',
    execute(message, args) {
        const gm = 'https://media.giphy.com/media/UyvYVo9Zs150n977Vl/giphy.gif'
        message.channel.send(gm)
    },
   
};