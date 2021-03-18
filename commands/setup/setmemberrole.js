const mongo = require('../../mongo');
const guildRolesSchema = require('./schemas/guild-roles-schema');

module.exports = {
    name: 'setmemberrole',
    description: 'sets base member role for the server',

    async execute(client, msg, args){

        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        }

        const role = msg.mentions.roles.first();
        const roleID = role.id

        await mongo().then(async mongoose => {
            try{
                const guildId = msg.guild.id;

                await guildRolesSchema.findOneAndUpdate(
                    {
                        _id: guildId
                    },
                    {
                        _id: guildId,
                        base: roleID
                    }, 
                    {
                        upsert: true
                    })

                    return msg.reply(`The base member role for this server is now ${role}`)
            } catch (err){
                return console.error(`Eror at setmemberrole.js(34): ${err}`)
            }
        })
    }
}