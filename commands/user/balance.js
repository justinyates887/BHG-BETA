const economy = require('../../features/economy')

module.exports = {
    name: 'balance',
    description: 'gives the user their economy balance',

    async execute(client, msg, args){
        const target  = msg.mentions.users.first() || msg.author;
        const targetID = target.id;
        const guildID = msg.guild.id
        const uID = targetID

        const balance = await economy.getCoins(guildID, uID)

        msg.channel.send(`<@${targetID}> has a balance of ${balance} coins`)

    }
}