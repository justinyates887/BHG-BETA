const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, user) => {
    const logs = await checkLogs(channel.guild.id)
    if(logs && logs.desired === true){
        const target = user.guild.channels.cache.find(channel => channel.id === logs.cID)
        const fetchedLogs = await user.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_REMOVE',
        })
        const discordLog = fetchedLogs.entries.first();
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("📝 User Un-banned")
                .setColor("#FFDF00")
                .setDescription(`User **${user.name}** has been un-banned by <@${discordLog.executor.id}>`)
                .setFooter(bhconfig.footer)
             return target.send(embed);
        }
        else {
            return target.send(`User **${user.name}** has been un-banned by <@${discordLog.executor.id}>`);
        }
    }
}