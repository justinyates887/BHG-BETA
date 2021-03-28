const suggestSchmea = require('./schemas/suggest-schema');
const mongo = require('../../mongo')
const { getRoles } = require('./getRoles');

module.exports = {
    name: 'setsuggestchannel',
    description: 'allows for guild owners to set a suggestion channel',

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

        const target = msg.mentions.channels.first() || msg.channel;

        if(!target){
            return msg.reply('No valid channel could be found')
        }

        try{
            const guildID = msg.guild.id

            await suggestSchmea.findOneAndUpdate({
                _id: guildID
            },{
                _id: guildID,
                cID: target.id,
            }, {
                upsert: true
            })

            return msg.reply(`The suggestions channel is now <#${target.id}>`)
        } catch(err){
            return console.error(`Error at setsuggest(48): ${err}`)
        }
    }
}

