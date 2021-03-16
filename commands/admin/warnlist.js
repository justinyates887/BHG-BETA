const mongo = require('../../mongo')
const warnSchema = require('../setup/schemas/warn-schema')

module.exports = {
    name: 'warnlist',
    description: 'gives a list of warnings for guild',

    async execute(client, msg, args) {
        const target = msg.mentions.users.first()
        if(!target){
            return msg.reply('Please specify a user')
        }

        const guildID = msg.guild.id
        const uID = target.id

        await mongo()
        .then(async mongoose => {
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
        })
    }
}