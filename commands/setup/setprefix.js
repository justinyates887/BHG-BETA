const mongo = require('../../mongo');
const commandPrefixSchema = require('./schemas/command-prefix-schema')
const commandBase = require('../../config/command-base')
const { getRoles } = require('./getRoles')

module.exports = {
    name: 'setprefix',
    description: 'sets custom prefix for the server',

    async execute(client, msg, args){

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

            try{
                const guildId = msg.guild.id;

                await commandPrefixSchema.findOneAndUpdate(
                    {
                        _id: guildId
                    },
                    {
                        _id: guildId,
                        prefix: args[0]
                    }, 
                    {
                        upsert: true
                    })

                    msg.reply(`The prefix for this server is now ${args[0]}`)
            } catch (err){
                return console.error(`Eror at setprefix.js(32): ${err}`)
            }
            return commandBase.loadPrefixes(client)
    }
}