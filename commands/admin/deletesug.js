const mongo = require('../../mongo')
const { getRoles } = require('../setup/getRoles')
const logSuggestionsSchema = require('../setup/schemas/log-suggestions-schema')
const suggestSchema = require('../setup/schemas/suggest-schema')

module.exports = {
    name: 'deletesug',
    description: 'deletes a suggestion by ID',

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

        const sID = args[0]

        const suggestion = await mongo()
        .then(async mongoose => {
            try{
                const result = logSuggestionsSchema.findOne({
                    guild: msg.guild.id,
                    sID: sID
                })
                return result
            }catch (err){
                return msg.reply(`I could not find a suggestion with that sID`)
            }
        })

        const messageID = suggestion.mID
        const uID = suggestion.uID

        const suggestChannel = await mongo()
        .then(async mongoose => {
            try{
                const result = await suggestSchema.findOne({
                    _id: msg.guild.id
                })
                return result
            }catch(err){
                return console.error(err)
            }
        })

        const channel = msg.guild.channels.cache.find(c => c.id === suggestChannel.cID)
        if(!channel){
            return msg.reply(`I could not find your suggestions channel`)
        }

        const targetMsg = await msg.channel.messages.fetch(messageID)
        targetMsg.delete()
        msg.delete()

        return await mongo()
        .then(async mongoose => {
            try{
                return logSuggestionsSchema.findOneAndDelete({
                    guild: msg.guild.id,
                    sID: sID,
                })
            }catch(err){
                return console.error(err)
            }
        })
    }
}