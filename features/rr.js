const bhconfig = require("../commands/core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");
const messageSchema = require('../commands/setup/schemas/message');
const message = require("../commands/setup/schemas/message");
const cache = {} // { guildID: [message, {Emoji: RoleID}]}

const fetchCache = (guildID) => cache[guildID] || []
const addToCache = (guildID, message, emoji, roleID) => {
    const array = cache[guildID] || [message, {}];
    if(emoji && roleID){
        array[a][emoji] = roleID
    }
    return cache[guildID] = array
}
const handleReaction = (reaction, user, adding) => {
    const { msg } = reaction
    const { guild } = msg

    const [fetchedMessage, roles] = fetchCache(guild.id)
    if(!fetchedMessage){
        return
    }
    if(fetchedMessage.id === msg.id && guild.me.hasPermission('MANAGE_ROLES')){
        const toCompare = reaction.emoji.id || reaction.emoji.name;

        for(const key of Object.keys(roles)){
            if(key === toCompare){
                const role = guild.roles.cache.get(roles[key])
                if(role){
                    const member = guild.members.cache.get(user.id);
                    if(adding){
                        return member.roles.add(role)
                    } else {
                        return member.roles.remove(role)
                    }
                }
                return
            }
        }
    }
}

module.exports = {
    name: 'rr',
    description: '',

    async execute(client, msg, args, logs, blueLogs){
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

module.exports.fetchCache = fetchCache;
module.exports.addToCache = addToCache;
module.exports.handleReaction = handleReaction;