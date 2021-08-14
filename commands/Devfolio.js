const puppeteer = require('puppeteer')

const GetItems = async ()=>{
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });

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
        console.log(ItemArray)
        return ItemArray;
        
    })).catch(()=>console.log('Error!!'))
    return ItemList;
    
}


module.exports = {
    name: 'devfolio',
    desc: 'first command',
    execute(message, args, Discord){
        const Scraper = async ()=>{
            const devfolio = await GetItems()
            console.log(devfolio)

            devfolio.forEach(event => {
                message.channel.send(JSON.stringify(event.itemName))
                message.channel.send(JSON.stringify(event.itemDate_start) + " - " + JSON.stringify(event.itemDate_end))
                message.channel.send(JSON.stringify(event.itemURL))
            })
        }
        
        Scraper()
    }
}