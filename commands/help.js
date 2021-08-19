const { TeamMember } = require("discord.js")

module.exports = {
    name: 'help',
    desc: 'Gives all information about hackermon',
    execute(message, args, Discord){
        const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('HackerMon')
                .setDescription('My commands')
                .addFields(
                    { name:  "!mlh", value: 'Will show you all the upcoming hackathons organized by MLH'},
                    { name:  "!hackclub", value: 'Will show you all the upcoming hackathons organized by HackClub'},
                    { name:  "!devfolio", value: 'Will show you all the upcoming hackathons organized by Devfolio'},
                    { name: '!kick <@user>', value: 'Will kick the mentioned user from the server'},
                    { name: '!ban <@user>', value: 'Will ban the mentioned user from the server'},
                    { name: '!clear <@number of messages>', value: 'Will clear the mentioned number of messages'}
                )
                .setFooter('Want help? Just press `!help`')
    }
}