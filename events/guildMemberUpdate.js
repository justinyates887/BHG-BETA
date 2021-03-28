const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, member) => {
    const logs = await checkLogs(member.guild.id)
    if(logs && logs.desired === true){
        const target = member.guild.channels.cache.find(channel => channel.id === logs.cID)
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_UPDATE',
        })
        const discordLog = fetchedLogs.entries.first();
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("📝 User Updated")
                .setColor("#FFDF00")
                .setDescription(`User **${member.name}** has had their settings updated by <@${discordLog.executor.id}>`)
                .setFooter(bhconfig.footer)
             return target.send(embed);
        }
        else {
            return target.send(`User **${member.name}** has had their settings updated by <@${discordLog.executor.id}>`);
        }
    }
    return
}