const cache = {}
const redis = require('../redis');
const { getRoles } = require('../commands/setup/getRoles')

module.exports = async (client, member) => {
    console.log('member joined');

    onJoin(member);
    checkMute(member);
}

const onJoin = async member => {
    const { guild } = member

    cache[guild.id] = [channel.id, text];

    let data = cache[guild.id]

    if(!data){
        console.log('welcomeCMD: FETCHING FROM DATABASE')

        await mongo().then(async (mongoose) => {
            try{
                const result = await welcomeSchema.findOne({ _id: guild.id })
                if(result && !result === null)
                {cache[guild.id] = data = [result.channelId, result.text]}
            } catch (err){
                console.error(`Error at guildMemberAdd.js(event)(25): ${err}`)
            }
        })
    }

    const channelId = data[0];
    const text = data[1];
    const channel = guild.channels.cache.get(channelId)
    channel.send(text.replace(/<@>/g, `<@${member.id}>`));
}
 
const checkMute = async member => {
    const { id, guild  } = member;
    const redisCLient = await redis();

    try{
        redisCLient.get(`muted-${id}`, (err, result) => {
            if(err){
                return console.error(`Error conntecting to redis at guildMemberAdd.js(45): ${err}`)
            } else if (result){
                const guildRoles = getRoles(guild.id);
                const mutedRole = guild.roles.cache.find(role => role.id === guildRoles.mute)

                if(mutedRole){
                    return member.roles.add(mutedRole)
                }
            }
        })
    } catch(err){
        console.error(`Error at guildMemberAdd(44): ${err}`)
    }
}