const economy = require('../../features/economy')
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'addbal',
    description: 'allows admin to add balance to user',

    async execute (client, msg, args){
        const admin = await getRoles(msg.guild.id)
        const checkRoles = function(admin){
            if(admin && admin.admin){
                let result;
                for(let i = 0; i < admin.admin.length; i++){
                    const role =  msg.member.guild.roles.cache.find(r => r.id === admin.admin[i])
                    if(admin.admin[i] === role.id){
                        result = true
                    } else {
                        result = false
                    }
                }
                return result
            }
        }

        if(!msg.member.hasPermission('ADMINISTRATOR') && checkRoles(admin) === false){
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
        const whyWontThisWorkCoins = await economy.getCoins(guildID, uID)

        msg.reply(`You have given <@${uID}> ${coins} coin(s). They now have a balance of ${whyWontThisWorkCoins}.`);
    }
}