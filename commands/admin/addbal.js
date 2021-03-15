const economy = require('../../features/economy')

module.exports = {
    name: 'addbal',
    description: 'allows admin to add balance to user',

    async execute (client, msg, args){
        if(!msg.member.hasPermission('ADMINISTRATOR')){
            return msg.channel.send('Missing permissions');
        }

        const mention = msg.mentions.users.first();

        if(!mention){
           return msg.reply('Please tag a user') 
        }

        const coins = args[1];
        if(isNaN(coins)){
            return msg.reply('Please provide a vlaid number of coins')
        }

        const guildID = msg.guild.id
        const uID = mention.id

        const newCoins = await economy.addCoins(guildID, uID, coins)

        msg.reply(`You have given <@${uID}> ${coins} coin(s). They now have a balance of ${newCoins}.`);
    }
}