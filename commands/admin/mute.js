const redis = require('../../redis');
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'mute',
    description: "This mutes a member",

    async execute(client, msg, args) {
        if(!msg.member.hasPermission('ADMINISTRATOR')){
            msg.reply('You do jnot have permission to run this command')
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
        const muteFind = msg.guild.roles.cache.find(role => role.id === muteRole)

        if(!muteFind){
            msg.reply(`I couldn't find your muted role <@${muteRole}>. Please update mute role!`)
        }

        if(!muteRole || muteRole === null){
            msg.reply('Could not find a mute role. Have you configured a mute role for this server? [b!checklist]')
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
            console.error(`Error in mute.js(72): ${err}`)
        }


    }
}
 