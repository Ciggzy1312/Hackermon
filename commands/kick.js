module.exports = {
    name: 'kick',
    desc: 'command to kick someone from server',
    execute(message, args, Discord){
        // gets the member name mentioned after the command
        const member = message.mentions.users.first();
        if(member){
            // gets the id of the mentioned member
            const memberTarget = message.guild.members.cache.get(member.id);
            // replace kick with ban for making a ban command
            memberTarget.kick();
            message.channel.send(`${member} has been kicked from the server`);
        }
        else{
            message.channel.send(`Please enter a valid name!!!`)
        }
    }
}