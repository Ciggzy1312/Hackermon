module.exports = {
    name: 'embed',
    desc: 'first command',
    execute(message, args, Discord){

        const data = [1,2,3,4,5]

        data.forEach(num => {
            const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Some title')
        .setDescription('Some description here')
        .setURL('https://discord.js.org/')
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        )
            
            message.channel.send(embed)
        })
    }
}