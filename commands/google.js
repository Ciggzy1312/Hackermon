const { TeamMember } = require("discord.js")

module.exports = {
    name: 'google',
    desc: 'send google url',
    execute(message, args, Discord){
        
        //checks if the sender has the role to send the message(we can add role and remove it also)
        if(message.member.roles.cache.has('865367585305788427')){
            message.channel.send('https://www.google.com/');
        }
        else{
            message.channel.send("Sorry you don't have the permission to send link :)");
        }
    }
}