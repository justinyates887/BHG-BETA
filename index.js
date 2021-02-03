const Discord = require('discord.js')       //initialize discord library adn API's
const client = new Discord.Client()   
const { Player } = require('discord-player'); //create instance of discord client

const config = require("./config/bot.js")
const bhconfig = require("./commands/core/bhconfig.json")

client.player = new Player(client);
client.bhconfig = require('./commands/core/bhconfig')
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new Discord.Collection(); //for client.command.get
client.bhcommands = new Discord.Collection();

const path = require('path')                           
const fs = require('fs') //initialize fs (goes with discord.collection)

const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5NDY3NDU0ODg3NTQ2MDY0OSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjExMTY0MDM5fQ._xTPzCfejiQuftOibOgMgw1gjXap0-2qZHWkAG4iVhA', client);

const bot = '794674548875460649';           //bot Uid
let logs;

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
  console.log(`Loading discord.js event ${file}`);
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
};

const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of player) {
  console.log(`Loading discord-player event ${file}`);
  const event = require(`./player/${file}`);
  client.player.on(file.split(".")[0], event.bind(null, client));
};

const bhcommand = fs.readdirSync(`./commands/user/`).filter(file => file.endsWith('.js'));

for (const file of bhcommand) {
    const bhcommand = require(`./commands/user/${file}`);
    console.log(`Loading Blue-Haired-Girl event ${file}`);
    client.bhcommands.set(bhcommand.name.toLowerCase(), bhcommand);
};


//log connection status and se tthe "Now playing" of the bot once activated and ready.
client.once('ready', async () => {
    
    //finds amount of servers bot is in
    const servers = client.guilds.cache.size;

    //logs to console bot online
    console.log(`Logged in as ${client.user.tag} (${client.user.id}) on ${servers} servers`);

    
});

    //*****************************************This is where version update goes when new version/features/bug fixes are added**********************************************

    // **********************************************************************************************************************************************************************

//checks meesages to listen for command
client.on('message', (msg) => {
    let blueLogs;
    blueLogs = msg.guild.channels.cache.find(c => c.name === ('blue-logs'));
    if (blueLogs){
        logs = true;
    }
    else{
        logs = false;
    }

    //checks blue haired server for voters on top.gg
    if(msg.guild.id === '795324515034726410'){
        let user = msg.author.id;
        let role = msg.guild.roles.cache.find((role) => {
            return role.id == '801158747070136330';
        })
        const member = msg.guild.members.cache.find((member) => {
            return member.id === msg.author.id;
        });
        dbl.hasVoted(user).then(voted => {
            if (voted) member.roles.add(role);
        });
    }
});

//Sends welcome message with info on invite
client.on("guildCreate", guild => {
    let found = 0;
    guild.channels.cache.map((channel) => {
        if (found === 0) {
          if (channel.type === "text") {
            if (channel.permissionsFor(client.user).has("VIEW_CHANNEL") === true) {
              if (channel.permissionsFor(client.user).has("SEND_MESSAGES") === true) {
                if (config.embeds === true) { 
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Hello!")
                        .setColor("#486dAA") 
                        .setDescription("Thank you for inviting me!\n\n We are still in production and have no database yet, so customization is limited. \
                        There are a few things you need to have for some functions to work properly.\n\nIf you would like to recieve logs, please use the \
                        command !addlogschannel. This will create a channel called #blue-logs where all of our logs will be sent. If there is no such \
                        channel no logs will be sent.\n\nThe !mute command requires the role @MUTED\n\nTo see a full list of commands use !help\n\n\
                        To follow production visit us at https://github.com/justinyates887/blue-haired-girl-bot \n\nTo report a bug please friend \
                        @erodias#9576,@Mr.Floyd 🇨🇦#0420 or join the Official Discord Channel: https://discord.gg/tb4mZWtXC8") //main text body
                        .setFooter(config.footer)
                         channel.send(embed);
                }
                found = 1;

                if(channel.permissionsFor(client.user).has("ADMINISTRATOR") === true){
                    guild.channels.create('blue-logs', {
                        type: 'text',
                        permissionOverwrites: [
                            {
                                id: guild.id,
                                allow: ['VIEW_CHANNEL'],
                            }]
                        })
                }
              }
            }
          }
        }
      })
  })

//sends message to log channel if logs are on
if(logs === true){
    client.on('guildMemberRemove',(member) => {
        client.channels.cache.find('blue-log').send(`**${member.username}** has just left server...`);
    })
}
//adds token so bot will initalize from .env
client.login(client.config.discord.token);