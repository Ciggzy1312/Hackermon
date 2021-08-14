module.exports = {
    name: 'ping',
    desc: 'first command',
    execute(message, args, Discord){
        message.channel.send('pong!')
    }
}