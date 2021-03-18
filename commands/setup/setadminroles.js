const mongo = require('../../mongo');
const guildRolesSchema = require('./schemas/guild-roles-schema');

module.exports = {
    name: 'setadminroles',
    description: 'sets admin roles for the server',

    async execute(client, msg, args){

        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        }

        if(!args){
            msg.channel.reply(`Please specify at least one role!`)
        }

        let roles = []
        msg.mentions.roles.forEach(role => {
            roles.push(role.id)
        })

        console.log(roles)

        await mongo().then(async mongoose => {
            try{
                const guildId = msg.guild.id;

                await guildRolesSchema.findOneAndUpdate(
                    {
                        _id: guildId
                    },
                    {
                        _id: guildId,
                        admin: roles
                    }, 
                    {
                        upsert: true
                    })

                    return msg.reply(`The admin roles for this server are now ${args}`)
            } catch (err){
                return console.error(`Eror at setmuterole.js(34): ${err}`)
            }
        })
    }
}