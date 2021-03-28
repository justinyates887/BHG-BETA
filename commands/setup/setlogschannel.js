const mongo = require("../../mongo");
const logsSchema = require('./schemas/logs-schema')
const { getRoles } = require('./getRoles')

module.exports = {
    name: 'setlogschannel',
    description: 'allows guild to set a logs channel',

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
        
        let target = msg.mentions.channels.first();

        try {
            await logsSchema.findOneAndUpdate({
                _id: msg.guild.id
            }, {
                cID: target.id,
                desired: true
            }, {
                upsert: true
            })
        } catch(err){
            return console.error(`Error at setlogschannel(23): ${err}`)
        }

        return msg.reply(`Logs channel set to ${target}`)
    }
}

module.exports.checkLogs = async (guildID) => {
    const result = await logsSchema.findOne({ _id: guildID });

    if(!result || !result.desired === true || result === null){
        return
    }
    return result
}