const mongo = require('../mongo');
require('dotenv').config();
const commandBase = require('../config/command-base');
const Discord = require('discord.js')
const client = new Discord.Client()
const AutoPoster = require('topgg-autoposter');
const ap = AutoPoster(process.env.DBL, client)


module.exports = async (client) => {
    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

    setInterval(() => {
        client.user.setActivity(`${client.guilds.cache.size} servers | ${client.users.cache.size} users`, {type: 'WATCHING'});
    }, 180000);
    
    //await mongo connection
    await mongo().then(mongoose => {
        try{
            console.log('Client and database ready')
        } catch(err) {
            console.error('Error connecting at ready.js: 24:' + err);
        }
    })

    ap.on('posted', () => {
        console.log('Posted stats to Top.gg!')
      })

    commandBase.loadPrefixes(client)
};