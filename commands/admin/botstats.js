const Discord = require('discord.js')       //initialize discord library adn API's
const client = new Discord.Client() 

module.exports = {
    name: 'botstats',
    description: 'allows for devs to see current bot stats',

    execute(client, msg, args) {
        console.log(msg.author.id)
        if(!msg.author.id === '558443383018881034' || !msg.author.id === '498323912514600960'){
            return
        }

        return msg.reply(`\nGuilds: ${client.guilds.cache.size}\n\
                    Users: ${client.users.cache.size}\n\
                    Ping: ${client.ws.ping}`)
    }
}