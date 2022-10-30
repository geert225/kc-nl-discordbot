module.exports = {
    name: 'ga',
    options: {
        args : [],
        neededargs : 0,
        roles : [],
        admincmd : false,
        privatecmd : false,
        avalibleinhelp : true
    },
    description: 'Send a cool gif (ga)',
    execute(message, args) {
        const ga = 'https://media.giphy.com/media/zpI81NICObA2OuGx3s/giphy.gif'
        message.channel.send(ga)
    },
   
};