const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, message) => {
    const logs = await checkLogs(message.guild.id)
    if(logs && logs.desired === true){
        const target = message.guild.channels.cache.find(channel => channel.id === logs.cID)
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        })
        const discordLog = fetchedLogs.entries.first();
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("❌ Message Deleted")
                .setColor("#FF0000")
                .setDescription(`Message *${message.content}* sent by <@${message.author.id}> deleted in <#${message.channel.id}> by <@${discordLog.executor.id}>`)
                .setFooter(bhconfig.footer)
             return target.send(embed);
        }
        else {
            return target.send(`Message *${message.content}* sent by <@${message.author.id}> deleted in <#${message.channel.id}> by <@${discordLog.executor.id}>`);
        }
    }
    return
}