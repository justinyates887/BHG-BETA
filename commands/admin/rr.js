const { fetchCache, addToCache } = require('../../features/rr');
const messageSchema = require('../setup/schemas/message');

module.exports = {
    name: 'rr',
    description: '',

    async execute(client, msg, args, logs, blueLogs){
        const { guild } = msg;
        
        if(!guild.me.hasPermission('MANAGE_ROLES')){
           return msg.reply('The bot requires MANAGE_ROLES permission')
        }

        let emoji = args.shift();
        let role = args.shift();
        let displayName = args.join(' ');

        if(role.startsWith('<@&')){
            role = role.substring( 3, role.length - 1)
        }

        const newRole = guild.roles.cache.find(r =>{
            return r.name === role || r.id === role
        }) || null

        if(!newRole){
            return msg.reply(`Could not find a role for ${role}`)
        }

        role = newRole

        if(emoji.includes(':')){
            const emojiName = emoji.split(':')[1];
            emoji = guild.emojis.cache.find(e => {
                return e.name === emojiName;
            })
        }

        const [fetchedMessage] = fetchCache(guild.id)
        if(!fetchedMessage){
            return msg.reply('An error occcured, please try again')
            console.log(error)
        }

        const newLine = `${emoji}: ${displayName}`;
        let { content } = fetchedMessage;

        if(content.includes(emoji)){
            const split = content.split('\n')
            for(let a = 0; a < split.length; a++){
                if(split[a].includes(emoji)){
                    split[a] = newLine
                }
            }
            content = split.join('\n')
        } else{
            content += `\n${newLine}`
            fetchedMessage.react(emoji)
        }

        fetchedMessage.edit(content);

        const obj = {
            guildID: guild.id,
            channelID: fetchedMessage.channel.id,
            messageID: fetchedMessage.id
        }

        await messageSchema.findOneAndUpdate(obj,
            {
            ...obj,
            $addToSet: {
                roles: {
                    emoji,
                    roleID: role.id
                }
            }
        },
        {
            upsert: true
        })
        addToCache(guild.id, fetchedMessage, emoji, role.id);
    }
}