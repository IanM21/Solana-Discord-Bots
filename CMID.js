const axios = require('axios');
const cheerio = require('cheerio');
var pretty = require('pretty');
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

   if(message.content.startsWith(`${prefix}CMID`)) {
       let url = message.content.split('!CMID')[1].trim();

        axios.get(url).then(response =>{

            const html = response.data ;
            const $ = cheerio.load(html);
            const json = JSON.stringify(response.data);
            const obj = JSON.parse(json);
            const prettyhtml = pretty(obj);
            //console.log(prettyhtml);

            var parsedHTML = $.load(prettyhtml);
            var folder = parsedHTML('script').get()[1].attribs['src']

            console.log(folder)

            let Full = url + folder;
            console.log(Full);

            axios.get(Full).then(response =>{

                let info = response.data
                console.log(typeof info);
                let $2 = cheerio.load(info);
                let respjson = JSON.stringify(info);
                let obje = JSON.parse(respjson);

                //console.log(typeof obje);

                let substring = 'REACT_APP_CANDY_MACHINE_ID:';

                console.log(info.includes(substring));


                const split1 = obje.split('REACT_APP_CANDY_MACHINE_ID:',)[1];
                //console.log(obje.split('REACT_APP_CANDY_MACHINE_ID:' )[1]);
                const removeit = split1.split(' "')[0];
                const replace = removeit.replace('"', ' ');
                
                    
                const REACT_APP_CANDY_MACHINE_ID = replace.split('",')[0]
                console.log(REACT_APP_CANDY_MACHINE_ID);

                message.channel.send(REACT_APP_CANDY_MACHINE_ID)
        
            })
        
        });
   }})

client.login(token);
    