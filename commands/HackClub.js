const puppeteer = require('puppeteer')
const pagination = require('discord.js-pagination')

const GetItems = async ()=>{
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
      })

    const page = await browser.newPage();

    await page.goto('https://hackathons.hackclub.com/')

    const ItemList = await page.waitForSelector('a.css-1bn5qip').then(()=>page.evaluate(()=>{
        const ItemArray = []
        const ItemNodeList = document.querySelectorAll('a.css-1bn5qip');
        ItemNodeList.forEach(item => {
            const itemURL = item.getAttribute('href')
            const itemName = item.querySelector('h3').innerText
            const itemDate = item.querySelector('footer>span.css-vurnku').innerText
            ItemArray.push({itemName, itemURL, itemDate})         
        });
        return ItemArray;
        
    })).catch(()=>console.log('Error!!'))
    return ItemList;
    
}


module.exports = {
    name: 'hackclub',
    desc: 'HackClub hackathons',
    execute(message, args, Discord){
        const Scraper = async ()=>{

            const pages = [];
            const hackClub = await GetItems()
            hackClub.forEach(event => {

                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(JSON.stringify(event.itemName))
                .addFields(
                    { name:  "Duration", value: JSON.stringify(event.itemDate) },
                    { name:  "Hackathon URL", value: JSON.stringify(event.itemURL) }
                )
                
                /*message.channel.send(JSON.stringify(event.itemName))
                message.channel.send(JSON.stringify(event.itemDate))
                message.channel.send(JSON.stringify(event.itemURL))*/

                //message.channel.send(embed)

                pages.push(embed);
            })

            const emoji = ["⏪", "⏩"]

            //const timeout = '5000'

            pagination(message, pages, emoji)
        }
        
        Scraper()
    }
}