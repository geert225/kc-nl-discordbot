module.exports = {
    name: 'sysready',
    event:  'ready',
    client: null,
    execute(){
        console.log('bot online!');
        console.log(`Logged in as ${this.client.user.tag}!`);
        this.client.user.setActivity(`Looking for Koleka problems | ${process.env.PREFIX}help`, { type: 'PLAYING' });
    }
};