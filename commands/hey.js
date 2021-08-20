module.exports = {
    name: 'hey',
    desc: 'first command',
    execute(message, args, Discord){
        message.channel.send('Hey how can HackerMon help you?')
    }
}