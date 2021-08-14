module.exports = {
    name: 'reaction',
    desc: 'gives out reaction to get roles',
    async execute(message, args, Discord, client){
        const channel = "864737101274415128";
        const yellow = message.guild.roles.cache.find('866100723740966922');
        const blue = message.guild.roles.cache.find('866100769543028768');

        const yellowEmoji = ':yellow_circle: ';
        const blueEmoji = ':blue_circle: ';

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose a team to play on!')
            .setDescription('Choosing a team will allow you to interact with your teammates!\n\n'
                + `${yellowTeamEmoji} for yellow team\n`
                + `${blueTeamEmoji} for blue team`);
    }
}