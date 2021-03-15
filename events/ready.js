const mongo = require('../mongo');
const commandBase = require('../config/command-base');
const Discord = require('discord.js')       //initialize discord library adn API's
const client = new Discord.Client()
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5NDY3NDU0ODg3NTQ2MDY0OSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjExMTY0MDM5fQ._xTPzCfejiQuftOibOgMgw1gjXap0-2qZHWkAG4iVhA', client);


module.exports = async (client) => {
    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

    client.user.setActivity(`${client.guilds.cache.size} servers | ${client.users.cache.size} users`, {type: 'WATCHING'});

    setInterval(() => {
        dbl.postStats(client.guilds.size);
        //sets game activity
        client.user.setActivity(`${config.prefix}help | ${servers} servers!`);
    }, 180000);
    
    //await mongo connection
    await mongo().then(mongoose => {
        try{
            console.log('Connected to Mongo!')
        } finally {
            mongoose.connection.close();
        }
    })

    commandBase.loadPrefixes(client)
};