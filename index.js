require('dotenv').config();
const Discord = require('discord.js')       //initialize discord library adn API's
const client = new Discord.Client()   
const { Player } = require('discord-player'); //create instance of discord client
const mongo = require('./mongo');
const config = require("./config/bot.js")
const baseFile = 'command-base.js';
const { loadCommands, loadPrefixes } = require(`./config/command-base`);

client.player = new Player(client);
client.bhconfig = require('./commands/core/bhconfig')
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new Discord.Collection(); //for client.command.get
client.bhcommands = new Discord.Collection();
                      
const fs = require('fs') //initialize fs (goes with discord.collection)

fs.readdirSync('./commands').forEach(dirs => {
  const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

  for (const file of commands) {
      const command = require(`./commands/${dirs}/${file}`);
      console.log(`Loading command ${file}`);
      client.commands.set(command.name, command); 
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
    console.log(`Loading Blue-Haired-Girl command ${file}`);
    client.bhcommands.set(bhcommand.name, bhcommand);
};

loadCommands(client);

//adds token so bot will initalize from .env
client.login(process.env.SECRET);