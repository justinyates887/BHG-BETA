const cache = {}

module.exports = async (client, member) => {
    console.log('member joined');

    onJoin(member);
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