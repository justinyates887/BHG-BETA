//channelDelete event
const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, channel) => {
    const logs = await checkLogs(channel.guild.id)
    if(logs && logs.desired === true){
        const target = channel.guild.channels.cache.find(channel => channel.id === logs.cID)
        const fetchedLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_DELETE',
        })
        const discordLog = fetchedLogs.entries.first();
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("❌ Channel Deletion")
                .setColor("#FF0000")
                .setDescription(`Channel **<#${channel.name}>** was just deleted by <@${discordLog.executor.id}>`)
                .setFooter(bhconfig.footer)
             return target.send(embed);
        }
        else {
            return target.send(`Channel <#${channel.id}> was just deleted by <@${discordLog.executor.id}>`);
        }
    }
}