const got = require('got');
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
       let url = 'https://api-mainnet.magiceden.dev/launchpads/'
       let fullurl = url + message.content.split('!LP')[1].trim();


        got(fullurl, {json: false}).then(response => {

            const obj = response.body;
            //console.log(typeof obj)
            //console.log(obj)


            let substring = 'candyMachineId';

            console.log(obj.includes(substring));

            const split1 = obj.split('candyMachineId',)[1];
            //console.log(split1)

            const removeit = split1.split('":"')[1];
            const remove2 = removeit.replace('"},"createdAt', ' ');
            const CMID = remove2.replace('","config', ' ');
            console.log(CMID);

            message.channel.send(CMID);

        })
   }});

client.login(token)
    
