const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, emoji) => {
    const logs = await checkLogs(emoji.guild.id)
    if(logs.desired === true){
        const target = emoji.guild.channels.cache.find(channel => channel.id === logs.cID)
        const fetchedLogs = await emoji.guild.fetchAuditLogs({
            limit: 1,
            type: 'EMOJI_DELETE',
        })
        const discordLog = fetchedLogs.entries.first();
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor(`❌ Emoji Deleted`)
                .setColor("#FF0000")
                .setDescription(`Server emoji **${emoji.name}** deleted by <@${discordLog.executor.id}>`)
                .setFooter(bhconfig.footer)
             return target.send(embed);
        }
        else {
            return target.send(`Server emoji **${emoji.name}** deleted by <@${discordLog.executor.id}>`);
        }
    }
}