const Discord = require('discord.js')
const client = new Discord.Client() 

module.exports = {
    name: 'simleave',
    description: 'allows for testing of leave methods for developers',

    execute(client, msg, args){
        if(!msg.member.id === '558443383018881034' || !msg.member.id === '498323912514600960'){
            return
        }

        return client.emit('guildMemberRemove', msg.member);
    }
}