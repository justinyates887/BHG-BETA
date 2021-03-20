const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, emoji) => {
    const logs = await checkLogs(emoji.guild.id)
    if(logs.desired === true){
        const target = emoji.guild.channels.cache.find(channel => channel.id === logs.cID)
        const newEmoji = emoji.guild.emojis.cache.find(e => e.id === emoji.id)
        const fetchedLogs = await emoji.guild.fetchAuditLogs({
            limit: 1,
            type: 'EMOJI_UPDATE',
        })
        const discordLog = fetchedLogs.entries.first();
        console.log(newEmoji)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor(`📝 Emoji Updated`)
                .setColor("#FFDF00")
                .setDescription(`Server emoji **${newEmoji.name}** updated by <@${discordLog.executor.id}>`)
                .setFooter(bhconfig.footer)
             return target.send(embed);
        }
        else {
            return target.send(`Server emoji **${newEmoji.name}** updated by <@${discordLog.executor.id}>`);
        }
    }
}