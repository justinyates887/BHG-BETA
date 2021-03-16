const mongo = require('../../mongo');
const commandPrefixSchema = require('./schemas/command-prefix-schema')
const commandBase = require('../../config/command-base')

module.exports = {
    name: 'setprefix',
    description: 'sets custom prefix for the server',

    async execute(client, msg, args, logs, blueLogs){

        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        }

        await mongo().then(async mongoose => {
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

                    return msg.reply(`The prefix for this server is now ${args[0]}`)
            } catch (err){
                return console.error(`Eror at setprefix.js(32): ${err}`)
            }
        }).then(() => {
            return commandBase.loadPrefixes(client)
        }).catch(err => {
            return console.error(`Error in loading prefixes (setprefixes.js)(35): ${err}`)
        })
    }
}