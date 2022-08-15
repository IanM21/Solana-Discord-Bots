const Discord = require('discord.js');
const { token } = require('./config.json');
const { userMention } = require('@discordjs/builders');
const axios = require('axios');


const client = new Discord.Client({
     intents: [
         "GUILDS",
         "GUILD_MESSAGES"
     ]     
});

const prefix = '!';

client.on('ready', () => {
    console.log('Magic Eden Bot is online!')
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLowerCase();

    if(message.content.startsWith(`${prefix}ME`)) {
        let MENAME = message.content.split('!ME')[1].trim();

        const URL = 'https://api-mainnet.magiceden.dev/v2/collections/' + MENAME + '/stats';

        var config = {
            method: 'get',
            url: URL,
            headers: {
              'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
              'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
              'accept-encoding': 'gzip, deflate, br',
              'accept-langauge': 'en-US,en;q=0.9',
              'cache-control': 'max-age=0',
              'sec-ch-ua-platform': "Windows",
              'sec-fetch-dest': 'document',
              'sec-fetch-mode': 'navigate',
              'sec-fetch-site': 'cross-site',
              'upgrade-insecure-requests': 1,
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
             }
          };

          axios(config)
         .then(function (response) {
         //console.log(JSON.stringify(response.data));
         const json = JSON.stringify(response.data);
         const obj = JSON.parse(json);

         // Symbol
         const Name = obj.symbol;
         console.log(Name);

         // Collection Page
         const Collection = "https://magiceden.io/marketplace/" + Name;
         console.log(Collection);

         // Floor
         const Floor = (obj.floorPrice / 1000000000) + " SOL";
         console.log(Floor);

         // Total Listed
         const TotalListed = obj.listedCount;
         console.log(TotalListed + " Listed");

         // Avg Sale
         const AvgSale = (obj.avgPrice24hr / 1000000000 + " SOL");
         console.log(AvgSale);

         // Volume All Time
         const Volume = (obj.volumeAll / 1000000000 + " SOL")
         console.log(Volume)

         // Webhook Stuff

         const { Webhook, MessageBuilder } = require('discord-webhook-node');
         const hook = new Webhook("https://discord.com/api/webhooks");

         const embed = new MessageBuilder()
         .setTitle('Magic Eden Listing Info')
         .setAuthor('Ian | supcanada')
         .setURL(Collection)
         .addField('Collection', Name, true)
         .addField('Floor', Floor, true)
         .addField('Volume', Volume, true)
         .addField('Avg Sale', AvgSale, true)
         .addField('Total Listings', TotalListed, true)
         .setColor('#00b0f4')
         .setThumbnail('https://cdn.discordapp.com/attachments/')
         .setDescription('Magic Eden Collection Scraper')
         .setFooter('Created By Ian', 'https://cdn.discordapp.com/attachments/')
         .setTimestamp();

         hook.send(embed);

         })
         .catch(function (error) {
         console.log(error);
         });
        }
    })
    client.login(token);

