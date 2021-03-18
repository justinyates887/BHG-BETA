const cache = {}
const redis = require('../redis');
const { getRoles } = require('../commands/setup/getRoles')
const { updateChannels } = require('../commands/setup/serverstats')
const { checkLogs } = require('../commands/setup/setlogschannel')

module.exports = async (client, member) => {
    const logs = await checkLogs(member.guild.id)
    if(logs.desired === true){
        const target = member.guild.channels.cache.find(channel => channel.id === logs.cID)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("✅ Member Joined")
                .setColor("#008000")
                .setDescription(`Member <@${member.id}> joined at ${new Date().toLocaleDateString}`)
                .setFooter(bhconfig.footer)
             target.send(embed);
        }
        else {
            target.send(`Member <#${member.id}> joined at ${new Date().toLocaleDateString}`);
        }
    }

    onJoin(member);
    checkMute(member);
    updateChannels(member.guild.id, member.guild);
}

const onJoin = async member => {
    const { guild } = member

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

        cache[guild.id] = [channel.id, text];
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