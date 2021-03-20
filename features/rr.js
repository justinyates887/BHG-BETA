const messageSchema = require('../commands/setup/schemas/message');
const cache = {} // { guildID: [message, {Emoji: RoleID}]}

module.exports = {
    name: 'rr',
    description: '',

    async execute(client, msg, args){
        const results = await messageSchema.find();

        for(const result of results){
            const { guildID, channelID, messageID, roles } = result;

            const guild = await client.guilds.cache.get(guildID);
            if(!guild){
                console.log(`Removing guildID ${guildID} from db due to bot removal.`);
                await messageSchema.deleteOne({ guildID });
                return
            }

            const channel = await guild.channels.cache.get(channelID);
            if(!channel){
                console.log(`Rmeoving channelID ${channelID} from db due to non-existance`);
                await messageSchema.deleteOne({ channelID })
                return
            }

            try{
                const cacheMessage = true;
                const skipCache = true;
                const fetchedMessage = await channel.messages.fetch(messageID, cacheMessage, skipCache);

                if(fetchedMessage){
                    return cache[guildID] = [fetchedMessage, roles]
                }
            } catch(err){
                console.log(`Removing messageID ${messageID} from the db`);
                return await messageSchema.deleteOne({ messageID });
            }
        }

    }
}

const fetchCache = (guildID) => cache[guildID] || []

const addToCache = async (guildID, message, emoji, roleID) => {
    const array = cache[guildID] || [message, {}];
    if(emoji && roleID){
        array[1][emoji] = roleID
    }

    await message.channel.messages.fetch(message.id, true, true)

    return cache[guildID] = array
}

const handleReaction = (reaction, user, adding) => {
    const { message } = reaction
    const { guild } = message

    const [fetchedMessage, roles] = fetchCache(guild.id)
    if(!fetchedMessage){
        return console.log(`Error in fetching cache`)
    }
    if(fetchedMessage.id === message.id && guild.me.hasPermission('MANAGE_ROLES')){
        const toCompare = reaction.emoji.id || reaction.emoji.name;

        for(const key of Object.keys(roles)){
            if(key === toCompare){
                const role = guild.roles.cache.get(roles[key])
                if(role){
                    const member = guild.members.cache.get(user.id);
                    console.log(member)
                    if(adding === true){
                        member.roles.add(role)
                    } else {
                        member.roles.remove(role)
                    }
                }
                return console.log(`reaction handled: ${member}`)
            }
        }
    }
}

module.exports.fetchCache = fetchCache;
module.exports.addToCache = addToCache;
module.exports.handleReaction = handleReaction;
