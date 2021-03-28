const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, role) => {
    const logs = await checkLogs(role.guild.id)
    if(logs && logs.desired === true){
        const target = role.guild.channels.cache.find(channel => channel.id === logs.cID)
        const fetchedLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: 'ROLE_UPDATE',
        })
        const discordLog = fetchedLogs.entries.first();
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("✅ Role Created")
                .setColor("#008000")
                .setDescription(`Role <@${role.id}> was just created by <@${discordLog.executor.id}>`)
                .setFooter(bhconfig.footer)
             return target.send(embed);
        }
        else {
            return target.send(`Role <#${role.id}> was just created by <@${discordLog.executor.id}>`);
        }
    }
}