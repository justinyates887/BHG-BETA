const reactionSchema = require('../setup/schemas/reaction-schema');
const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const Discord = require("discord.js");
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'rradd',
    description: 'adds a reaction role to a message',

    async execute(client, msg, args){
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

        if(!args[2]){
            msg.reply(`You did not specify your emoji`)
        }
        
        const mID = args[0]
        const role = msg.mentions.roles.first() || msg.guild.roles.cache.find(r => r.name === args[1])
        if(!role){
            msg.reply(`I couldn't find a targeted role`)
        }
        const channel = msg.mentions.channels.first() || msg.channel
        const emoji = args[2]

        let embed = new Discord.MessageEmbed()
            .setAuthor(`${msg.guild.iconURL} Reaction Roles`)
            .description(`${emoji} - <@${role.id}>`)
            .setTimestamp()
        channel.send(embed)
        await embed.react(emoji)

        const newData = new reactionSchema({
            _id: msg.guild.id,
            mID: mID,
            reaction: emoji,
            role: role.id
        }).save()

    }
}