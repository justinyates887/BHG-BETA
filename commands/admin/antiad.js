const mongo = require('../../mongo');
const antiAdSchema = require('../setup/schemas/anti-ad-schema')
let punishment = '';
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'antiad',
    description: 'prevents ads from being sent in your server if you so choose',

     async execute(client, msg, args){
        const admin = await getRoles(msg.guild.id)
        const checkRoles = function(admin){
            if(!admin === null && admin.admin){
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

        let filter = m => m.author.id === msg.author.id;
        msg.reply('Please respond with a command for anti-ads: (on/off)')

        msg.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
        })
        .then(async msg => {
            msg = msg.first();
            if(msg.content.toLowerCase() === 'on') {
                try{
                    const guildId = msg.guild.id;
                    await antiAdSchema.findOneAndUpdate(
                        {
                            _id: guildId
                        },
                        {
                            desired: true,
                        },
                        {
                            upsert: true
                        })
    
                        return msg.reply(`The antiad is now ON`)
                } catch (err){
                    return console.error(`Error in db antiad.js(41): ${err}`)
                }
            } else if(msg.content.toLowerCase() === 'off'){
                try{
                    const guildId = msg.guild.id;
                    await antiAdSchema.findOneAndUpdate(
                        {
                            _id: guildId
                        },
                        {
                            desired: false,
                        },
                        {
                            upsert: true
                        })
    
                        return msg.reply(`The anti-ads are now OFF`)
                } catch (err){
                   return console.error(`Error at db antiad.js(61): ${err}`)
                }
            } else {
                return msg.reply('No valid input recieved')
            }
        })
    }
}

const isInvite = async (guild, code) => {
    return await new Promise(resolve => {
        guild.fetchInvites()
            .then(invites => {
                for (const invite of invites){
                    if(code === invite[0]){
                        return resolve(true)
                    }
                }
                resolve(false)
            })
    })
}

module.exports.isInvite = isInvite;