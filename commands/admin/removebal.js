const economy = require('../../features/economy')
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'removebal',
    description: 'removes balance form a user',

    async execute(client, msg, args) { 
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

        const target  = msg.mentions.user.first()
        if(!target){
            msg.reply(`Please specify a target member to remove balance`)
        }

        args.shift()
        const amount = args[0]
        if(isNaN(amount)){
            msg.reply(`Please specify a valid number of coins to remove`)
        }

        const currentAmount = await economy.getCoins(msg.guild.id, msg.author.id)

        const balToRemove = currentAmount - amount;

        await economy.removeCoins(msg.guild.id, msg.author.id, balToRemove)
        return msg.reply(`Balance remove from <@${target.id}>. New balance is ${balToRemove}`)

    }
}