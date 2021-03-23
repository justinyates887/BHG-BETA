const mongo = require('../../mongo')
const profileSchema = require('../setup/schemas/profile-schema')

module.exports = {
    name: 'level',
    description: 'returns a users current level in the guild',

    async execute(client, msg, args){
        const level = await mongo()
        .then(async mongoose => {
            try{
                const result = await profileSchema.findOne({
                    _id: msg.author.id,
                    gID: msg.guild.id
                })
                return result
            } catch(err){
                console.error(`Error at level.js(17): ${err}`)
            }
        })

        return msg.reply(`you are level ${level.level}`)
    }
}