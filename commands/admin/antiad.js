const mongo = require('../../mongo');
const antiAdSchema = require('../setup/schemas/anti-ad-schema')
let punishment = '';

module.exports = {
    name: 'antiad',
    description: 'prevents ads from being sent in your server if you so choose',

     async execute(client, msg, args){
        if(!msg.member.hasPermission('ADMINISTRATOR')){
            msg.reply('You do not have the permissions to set this up.')
        }

        let filter = m => m.author.id === msg.author.id;
        msg.reply('Please enter a command for anti-ads: (on/off)')

        msg.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
        })
        .then(async msg => {
            msg = msg.first();
            if(msg.content.toLowerCase() === 'on') {
                await mongo().then(async mongoose => {
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
        
                            msg.reply(`The antiad is now ON`)
                    } catch (err){
                        console.error(`Error in db antiad.js(41): ${err}`)
                    }
            })
            } else if(msg.content.toLowerCase() === 'off'){
                await mongo().then(async mongoose => {
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
        
                            msg.reply(`The anti-ads are now OFF`)
                    } catch (err){
                        console.error(`Error at db antiad.js(61): ${err}`)
                    }
                })
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