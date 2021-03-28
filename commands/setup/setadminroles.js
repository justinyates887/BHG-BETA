const mongo = require('../../mongo');
const guildRolesSchema = require('./schemas/guild-roles-schema');
const { getRoles } = require('./getRoles')

module.exports = {
    name: 'setadminroles',
    description: 'sets admin roles for the server',

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

        if(!args){
            msg.channel.reply(`Please specify at least one role!`)
        }

        let roles = []
        msg.mentions.roles.forEach(role => {
            roles.push(role.id)
        })

        console.log(roles)

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
    }
}