module.exports = {
    name: 'mute',
    desc: 'mutes a member',
    execute(message, args){
        const target = message.mentions.users.first();

        if(target){
            let mainRole = message.member.roles.cache.has()
            let muteRole = message.member.roles.cache.has('865976809337389057')

            let memberTarget = message.guild.members.cache.get(target.id)

            
        }
    }
}