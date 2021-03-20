// channelUpdate event
const { checkLogs } = require('../commands/setup/setlogschannel');
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, channel) => {
    const logs = await checkLogs(channel.guild.id)
    if(logs.desired === true){
        const target = channel.guild.channels.cache.find(channel => channel.id === logs.cID)
        const fetchedLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_UPDATE',
        })
        const discordLog = fetchedLogs.entries.first();
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("📝 Channel Update")
                .setColor("#FFDF00")
                .setDescription(`Channel <#${channel.id}> was just updated by ${discordLog.executor.id}`)
                .setFooter(bhconfig.footer)
             target.send(embed);
        }
        else {
            target.send(`Channel <#${channel.id}> was just updated by ${discordLog.executor.id}`);
        }
    }
}