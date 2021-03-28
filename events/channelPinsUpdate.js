const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, channel) => {
    const logs = await checkLogs(channel.guild.id)
    if(logs && logs.desired === true){
        const target = channel.guild.channels.cache.find(channel => channel.id === logs.cID)
        const fetchedLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_PIN',
        }) || await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_UNPIN',
        })
        const discordLog = fetchedLogs.entries.first();
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("📝 Channel Pins Updated")
                .setColor("#FFDF00")
                .setDescription(`Pins updated in channel <#${channel.id}> by <@${discordLog.executor.id}>`)
                .setFooter(bhconfig.footer)
             return target.send(embed);
        }
        else {
            return target.send(`Pins updated in channel <#${channel.id}> by <@${discordLog.executor.id}>`);
        }
    }
}