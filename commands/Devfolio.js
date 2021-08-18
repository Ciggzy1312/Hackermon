const puppeteer = require('puppeteer')
const pagination = require('discord.js-pagination')

const GetItems = async ()=>{
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

    const page = await browser.newPage();

    await page.goto('https://devfolio.co/hackathons?hackathon_type%3Din_person%2Conline%26time_frame%3Dapplication_open')

    const ItemList = await page.waitForSelector('div.jcKWGN').then(()=>page.evaluate(()=>{
        const ItemArray = []
        const ItemNodeList = document.querySelectorAll('div.jcKWGN');
        ItemNodeList.forEach(item => {
            const itemURL = (item.querySelector('div>a.hcmcER')).getAttribute('href')
            const itemName = item.querySelector('div>a>span>span.kwhLPe').innerText
            const itemDate_start = item.querySelector('div>div.bEbkkX>span.esEXVk').innerText
            const itemDate_end = item.querySelectorAll('div>div.bEbkkX>span.esEXVk')[1].innerText
            
            /*const itemDate = item.querySelector('div > p').innerText
            const itemURL = item.getAttribute('href')*/
            ItemArray.push({itemName, itemURL, itemDate_start, itemDate_end})

            
        });
        return ItemArray;
        
    })).catch(()=>console.log('Error!!'))
    return ItemList;
    
}


module.exports = {
    name: 'devfolio',
    desc: 'first command',
    execute(message, args, Discord){
        const Scraper = async ()=>{
            const pages = []
            const devfolio = await GetItems()
            
            devfolio.forEach(event => {
                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(JSON.stringify(event.itemName))
                .addFields(
                    { name:  "Duration", value: JSON.stringify(event.itemDate_start) + " - " + JSON.stringify(event.itemDate_end) },
                    { name:  "Hackathon URL", value: JSON.stringify(event.itemURL) }
                )
                /*message.channel.send(JSON.stringify(event.itemName))
                message.channel.send(JSON.stringify(event.itemDate_start) + " - " + JSON.stringify(event.itemDate_end))
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