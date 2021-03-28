const mongo = require('../../mongo');
const welcomeSchema = require('./schemas/welcome-schema')
const { getRoles } = require('./getRoles')

const cache = new Map()

const loadData = async () => {
    const results = await welcomeSchema.find()

    for(const result of results){
        cache.set(result._id, result.channelID)
    }
}; loadData()


module.exports = {
    name: 'welcome',
    description: 'sets welcome custom welcome message for servers',

    async execute(client, msg, args){
        const { member, channel, content, guild } = msg

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

        const target = msg.mentions.channels.first();

        if(!target){
            msg.reply(`Please specify a target channel`)
        }

        try{
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                _id: guild.id,
                channelID: target.id,
            }, {
                upsert: true 
            })
        } catch (err){
            return console.error(`Error at db welcome.js(36)`)
        }

        cache.set(guild.id, target.id)

        return msg.reply(`Welcome channel now set to <#${target.id}>`)
    }
}

module.exports.getChannelID = (guildID) => {
    return cache.get(guildID)
}