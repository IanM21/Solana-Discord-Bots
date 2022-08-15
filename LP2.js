const cloudscraper = require('cloudscraper');
const Discord = require('discord.js');
const { token } = require('./config.json');

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]     
});

const prefix = '!';

client.on('ready', () => {
   console.log('SSD Bot is online!')
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLowerCase();
 
    if(message.content.startsWith(`${prefix}LP`)) {
        let url = 'https://api-mainnet.magiceden.io/launchpads/'
        let fullurl = url + message.content.split('!LP')[1].trim()
    // Create the fetchUrl function

    const fetchUrl = async (url) => {
        const delay = m => new Promise((resolve, reject) => { setTimeout(_ => resolve(), m) });
        try {
            const response = await cloudscraper.get(url).catch(async (err) => {
                if (err.statusCode) return;
                console.log(statusCode)
                await delay(1000);
                return fetchUrl(url);
            });
            if (!response) return;
            return JSON.parse(response);
        } catch (e) {
            await delay(1000);
            return fetchUrl(url);
        }
    };

    fetchUrl(fullurl).then((data) => {
        //console.log(data);

        let Collection = 'https://magiceden.io/launchpad/' + data['symbol']

        let Name = data['name']
        console.log(Name)

        let Image = data['image']
        console.log(Image)

        let Price = data['price'] + ' SOL'
        console.log(Price)

        let Size = data['size']
        console.log(Size)

        let CMID = data['state']['candyMachine']
        console.log(CMID)

        let itemsRedeemed = data['state']['itemsRedeemed']

        const totalminted = itemsRedeemed + '/' + Size
        console.log(totalminted)

        const totalremain = (Size - itemsRedeemed)
        console.log(totalremain)

        let percentMinted = (Math.floor((itemsRedeemed / Size) * 100)) + '%'
        console.log(percentMinted)

        const { Webhook, MessageBuilder } = require('discord-webhook-node');
        const hook = new Webhook("https://discord.com/api/webhooks/");

        const embed = new MessageBuilder()
        .setTitle('Magic Eden Launhpad Info')
        .setAuthor('ME Launchpad Info')
        .setURL(Collection)
        .addField('Collection', Name, true)
        .addField('CMID', CMID, true)
        .addField('Price', Price, true)
        .addField('Collection Size', Size, true)
        .addField('Minted', itemsRedeemed, true)
        .addField('Minted %', percentMinted, true)
        .addField('Reamining Mint', totalremain, true)
        .setColor('#00b0f4')
        .setThumbnail(Image)
        .setDescription('Magic Eden Launchpad Info')
        .setFooter('Created By Ian', 'https://cdn.discordapp.com/')
        .setTimestamp();

        hook.send(embed);
    });
}});

client.login(token)