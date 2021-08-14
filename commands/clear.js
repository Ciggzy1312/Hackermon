module.exports = {
    name : "clear",
    desc : "to clear message",
    async execute(message, args, Discord){
        if(!args[0]){
            message.channel.send('Please enter the no. of message you want to clear')
        }
        // checking if args[0] is a number or not and greater than 1
        else if(isNaN(args[0]) || args[0] < 1){
            message.channel.send('Please send a valid number of messages to be deleted')
        }
        else if(args[0] > 100){
            message.channel.send(`You can't clear more than 100 messages at one go!!!`)
        }
        else{
            await message.channel.messages.fetch({limit : args[0]}).then(messages=>{
                message.channel.bulkDelete(messages);
            })
        }
    }
}