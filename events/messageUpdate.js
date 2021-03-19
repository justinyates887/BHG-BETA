const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, message) => {
    if(message.member.user.bot){
        return
    }
    const logs = await checkLogs(message.guild.id)
    if(logs.desired === true){
        const target = message.guild.channels.cache.find(channel => channel.id === logs.cID)
        const newMessage = message.channel.messages.fetch(m => m.id === message.id)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("📝 Message Edited")
                .setColor("#FF0000")
                .setDescription(`User <@${message.author.id}> edited their message.\n\
                                    **Old message:** *${message.content}*\n\n\
                                    **New Message:** 8${newMessage.content}`)
                .setFooter(bhconfig.footer)
             return target.send(embed);
        }
        else {
            return target.send(`Message *${message.content}* sent by <@${message.author.id}> deleted in <#${message.channel.id}>`);
        }
    }
}