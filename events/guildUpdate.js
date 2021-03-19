const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, guild) => {
    const logs = await checkLogs(guild.id)
    if(logs.desired === true){
        const target = guild.channels.cache.find(channel => channel.id === logs.cID)
        const fetchedLogs = await guild.guild.fetchAuditLogs({
            limit: 1,
            type: 'GUILD_UPDATE',
        })
        const discordLog = fetchedLogs.entries.first();
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("📝 Guild Updated")
                .setColor("#FFDF00")
                .setDescription(`Guild has been updated by <@${discordLog.executor.id}>`)
                .setFooter(bhconfig.footer)
             target.send(embed);
        }
        else {
            target.send(`Guild has been updated by <@${discordLog.executor.id}>`);
        }
    }
}