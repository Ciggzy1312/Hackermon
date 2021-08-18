const puppeteer = require('puppeteer')
const pagination = require('discord.js-pagination')

const GetItems = async ()=>{
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://mlh.io/seasons/2022/events')

    const ItemList = await page.waitForSelector('div > a.event-link').then(()=>page.evaluate(()=>{
        const ItemArray = []
        const ItemNodeList = document.querySelectorAll('div > a.event-link');
        ItemNodeList.forEach(item => {
            const itemTitle = item.getAttribute('title')
            const itemDate = item.querySelector('div > p').innerText
            const itemURL = item.getAttribute('href')
            ItemArray.push({itemTitle, itemDate, itemURL})
        });
        return ItemArray
    })).catch(()=>console.log('Error!!'))
    //console.log(ItemList)
    return ItemList
}


module.exports = {
    name: 'mlh',
    desc: 'returns mlh events',
    execute(message, args, Discord){
      const initScrapper = async ()=>{
          const pages = []
          const events = await GetItems();  
          events.forEach(event=>{
            if(event.itemDate.length === 14){
                var d = Date.parse(JSON.stringify(event.itemDate.slice(0,5)) + ",2021");
              }
              else if(event.itemDate.length === 13){
              var d = Date.parse(JSON.stringify(event.itemDate.slice(0,5)) + ",2021");
              }
             else{
              var d = Date.parse(JSON.stringify(event.itemDate.slice(0,6)) + ",2021");
              }
              
            if(Date.parse(new Date) < d){
              const embed = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setTitle(JSON.stringify(event.itemTitle))
              .addFields(
                { name:  "Duration", value: JSON.stringify(event.itemDate) },
                { name:  "Hackathon URL", value: JSON.stringify(event.itemURL) }
              )
             /*message.channel.send(JSON.stringify(event.itemTitle))
             message.channel.send(JSON.stringify(event.itemDate))
             message.channel.send(JSON.stringify(event.itemURL))*/

             //message.channel.send(embed)

             pages.push(embed);
            }
          })

          const emoji = ["⏪", "⏩"]

            //const timeout = '5000'

            pagination(message, pages, emoji)
        }
        
        initScrapper();
    }
}