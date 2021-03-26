const redis = require('../../redis');
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'mute',
    description: "This mutes a member",

    async execute(client, msg, args) {
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

        const target = msg.mentions.users.first();
        if(!target){
            return msg.reply('You need to specify a user')
        }
        args.shift();
        const duration = Number(args.join('')) * 60
        const guildID = msg.guild.id
        const result = await getRoles(guildID)
        const muteRole = result.mute
        const muteFind = msg.guild.roles.cache.find(r => r.id === muteRole)

        if(!muteFind){
            return msg.reply(`I couldn't find your muted role <@${muteRole}>. Please update mute role!`)
        }

        if(!muteRole || muteRole === null){
           return msg.reply('Could not find a mute role. Have you configured a mute role for this server? [b!checklist]')
        }

        //if no duration specified, mute the member indefinatly
        if(!duration){
            duration = 0
        }

        if(isNaN(duration)){
            return msg.reply('Please specify a number = the amount of minutes you would like to mute.')
        }

        redis.expire(message => {
            if(message.startsWith('muted-')){
                const split = message.split('-');
                const findGuild = split[2]
                const findMember = split[1]
                const guild = client.guilds.cache.get(findGuild)
                const member = guild.members.cache.get(findMember)

                if(!guild){
                    return
                } else if(!member){
                    return
                }

                member.roles.remove(muteFind)
            }
        })

        const targetID = target.id
        const why = msg.guild.members.cache.find(member => member.id === targetID)

        const redisClient = await redis();
        try{
            const redisKey = `muted-${target.id}-${guildID}`
            if(duration > 0){
                redisClient.set(redisKey, 'true', 'EX', duration);
                 why.roles.add(muteFind)
            } else {
                redisClient.set(redisKey, 'true')
                 why.roles.add(muteFind)
            }

           return msg.channel.send(`<@${target.id}> muted for ${duration / 60} minutes`)
        } catch(err) {
            return console.error(`Error in mute.js(72): ${err}`)
        }
    }
}
 