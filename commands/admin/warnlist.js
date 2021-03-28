const mongo = require('../../mongo')
const warnSchema = require('../setup/schemas/warn-schema')
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'warnlist',
    description: 'gives a list of warnings for guild',

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
        const target = msg.mentions.users.first()
        if(!target){
            return msg.reply('Please specify a user')
        }

        const guildID = msg.guild.id
        const uID = target.id

        try{
            const results = await warnSchema.findOne({
                _id: uID,
                gID: guildID
            })

            if(results){
                let reply = `Previous warnings for <@${uID}>:\n\n`

                for(const warning of results.warnings){
                    const { author, timestamp, warnReason } = warning
                    reply += `By **${author}** on *${new Date(timestamp).toLocaleDateString()}* for \`${warnReason}\`\n\n`
                }

                return msg.channel.send(reply)
            } else if(!results || results === null) {
                return msg.reply(`User <@${uID}> has no warnings`)
            }
        } catch(err){
            console.error(`Error at db warnlist.js(23): ${err}`)
        }
    }
}