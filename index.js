const Discord = require('discord.js');

// our discord bot client
const client = new Discord.Client()
require('dotenv').config();
// with what our command will start
const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

//retuns a array of all the filtered out files having .js extension from the commands folder
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
//to iterate over the commandFiles array and import a desired file
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    // set the key value pair in our newly made collection above
    client.commands.set(command.name, command);
    // command.name -> ping
    //command -> { name: 'ping', desc: 'first command', execute: [Function: execute] }
    /*console.log(client.commands) -> Collection(1) [Map] {
        'ping' => { name: 'ping', desc: 'first command', execute: [Function: execute] }
      }*/

      //console.log(client.commands.get('ping').desc) -> 'first command'
}


client.on('ready', ()=>{
    console.log('Bot is ready!!!');
})

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.id === '866085212030238720');
 
    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('866086512592158720').send(`Welcome <@${guildMember.user.id}> to our server!`)
});

// messages that are to be sent
client.on('message', (message)=>{
    // if the message doesn't start with prefix or the bot itself sends the message(which is very dangerous XD) we ignore it
    if(!message.content.startsWith(prefix) || message.author.bot){
        return;
    }

    // will store a array consisting of all the words in command line except the prefix
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    // will return the word after the prefix or the first word in args array
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)){
        return;
    }

    // executes the execute function of the passed in command
    client.commands.get(command).execute(message, args, Discord)
});

// to make the bot come online
client.login(process.env.BOT_TOKEN)

