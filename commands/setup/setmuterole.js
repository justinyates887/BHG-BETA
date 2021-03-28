const mongo = require('../../mongo');
const guildRolesSchema = require('./schemas/guild-roles-schema');
const { getRoles } = require('./getRoles')

module.exports = {
    name: 'setmuterole',
    description: 'sets mute role for the server',

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

        const role = msg.mentions.roles.first();
        const roleID = role.id

        try{
            const guildId = msg.guild.id;

            await guildRolesSchema.findOneAndUpdate(
                {
                    _id: guildId
                },
                {
                    _id: guildId,
                    mute: roleID
                }, 
                {
                    upsert: true
                })

                return msg.reply(`The mute role for this server is now ${role}`)
        } catch (err){
            return console.error(`Eror at setmuterole.js(34): ${err}`)
        }
    }
}