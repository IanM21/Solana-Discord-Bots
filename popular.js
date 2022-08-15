const axios = require('axios')
const Discord = require('discord.js');
const { token } = require('./config.json');
const { userMention } = require('@discordjs/builders');



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

    if(message.content.startsWith(`${prefix}POP`)) {
        async function New() {
            // Api Call
            
            var config = {
            method: 'get',
            url: 'https://api-mainnet.magiceden.dev/popular_collections?timeRange=24h',
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



            axios(config).then(function (response) {
                
                const json = JSON.stringify(response.data);
                //console.log(JSON.stringify(response.data));
                const obj = JSON.parse(json);
                console.log(typeof obj)
                
                // Collection 1

                // Symbol
                const Symbol = obj['collections'][0]['symbol'];
                //console.log(Symbol);

                // Collection Page
                const Collection = "https://magiceden.io/marketplace/" + Symbol;
                //console.log(Collection);

                // Name
                const Name = obj["collections"][0]["name"];
                //console.log(Name);

                // Description
                const Description = obj["collections"][0]["description"];
                //console.log(Description);

                // Image
                const Image = obj["collections"][0]["image"];
                //console.log(Image);

                // Total Items
                var TotalItems = obj["collections"][0]["totalItems"];
                //console.log(TotalItems);

                // Watchlist
                var watchlistCount = obj["collections"][0]["watchlistCount"];
                //console.log(watchlistCount);

                // Discord
                var Discord = obj["collections"][0]["discord"];
                //console.log(Discord);

                ///////////////////////////////////////////////////////////////////

                // Collection 2

                // Symbol
                const Symbol2 = obj['collections'][1]['symbol'];
                //console.log(Symbol2);

                // Collection Page
                const Collection2 = "https://magiceden.io/marketplace/" + Symbol;
                //console.log(Collection2);

                // Name
                const Name2 = obj["collections"][1]["name"];
                //console.log(Name2);

                // Description
                const Description2 = obj["collections"][1]["description"];
                //console.log(Description2);

                // Image
                const Image2 = obj["collections"][1]["image"];
                //console.log(Image2);

                // Total Items
                var TotalItems2 = obj["collections"][1]["totalItems"];
                //console.log(TotalItems2);

                // Watchlist
                var watchlistCount2 = obj["collections"][1]["watchlistCount"];
                //console.log(watchlistCount2);

                // Discord
                var Discord2 = obj["collections"][1]["discord"];
                //console.log(Discord2);

                ///////////////////////////////////////////////////////////////////////

                // Collection 3

                // Symbol
                const Symbol3 = obj['collections'][2]['symbol'];
                //console.log(Symbol3);

                // Collection Page
                const Collection3 = "https://magiceden.io/marketplace/" + Symbol;
                //console.log(Collection3);

                // Name
                const Name3 = obj["collections"][2]["name"];
                //console.log(Name3);

                // Description
                const Description3 = obj["collections"][2]["description"];
                //console.log(Description3);

                // Image
                const Image3 = obj["collections"][2]["image"];
                //console.log(Image3);

                // Total Items
                var TotalItems3 = obj["collections"][2]["totalItems"];
                //console.log(TotalItems3);

                // Watchlist
                var watchlistCount3 = obj["collections"][2]["watchlistCount"];
                //console.log(watchlistCount3);

                // Discord
                var Discord3 = obj["collections"][2]["discord"];
                //console.log(Discord3);

                // Webhook1 Stuff

                const { Webhook, MessageBuilder } = require('discord-webhook-node');
                const hook = new Webhook("https://discord.com/api/webhooks/");

                const embed = new MessageBuilder()
                .setTitle('Popular Collections (24h)')
                .setAuthor('Popular M.E Collections')
                .setURL(Collection)
                .setDescription(Description)
                .addField('Collection', Name, true)
                .addField('Symbol', Symbol, true)
                .addField('Total Items', TotalItems, true)
                .addField('Watchlist', watchlistCount, true)
                .addField('Discord', Discord, true)
                .setColor('#00b0f4')
                .setThumbnail(Image)
                .setFooter('Created By Ian')
                .setTimestamp();

                
                hook.send(embed).then(console.log("Webhook Sent"));


                const hook2 = new Webhook("https://discord.com/api/webhooks/");

                const embed2 = new MessageBuilder()
                .setTitle('Popular Collections (24h)')
                .setAuthor('Popular M.E Collections')
                .setURL(Collection2)
                .setDescription(Description2)
                .addField('Collection', Name2, true)
                .addField('Symbol', Symbol2, true)
                .addField('Total Items', TotalItems2, true)
                .addField('Watchlist', watchlistCount2, true)
                .addField('Discord', Discord2, true)
                .setColor('#00b0f4')
                .setThumbnail(Image2)
                .setFooter('Created By Ian')
                .setTimestamp();

                
                hook2.send(embed2).then(console.log("Webhook Sent"));


                const hook3 = new Webhook("https://discord.com/api/webhooks/");

                const embed3 = new MessageBuilder()
                .setTitle('Popular Collections (24h)')
                .setAuthor('Popular M.E Collections')
                .setURL(Collection3)
                .setDescription(Description3)
                .addField('Collection', Name3, true)
                .addField('Symbol', Symbol3, true)
                .addField('Total Items', TotalItems3, true)
                .addField('Watchlist', watchlistCount3, true)
                .addField('Discord', Discord3, true)
                .setColor('#00b0f4')
                .setThumbnail(Image3)
                .setFooter('Created By Ian')
                .setTimestamp();

                
                hook3.send(embed3).then(console.log("Webhook Sent"));

                
            })
            .catch(function (error) {
                console.log(error);
            });
        
        }
        New()
    }})

client.login(token); 