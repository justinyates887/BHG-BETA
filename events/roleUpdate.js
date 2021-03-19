const { checkLogs } = require('../commands/setup/setlogschannel');
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, role) => {
    const logs = await checkLogs(role.guild.id)
    if(logs.desired === true){
        const targetLogs = role.guild.channels.cache.find(channel => channel.id === logs.cID)

        const fetchedLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: 'ROLE_UPDATE',
        })
        const discordLog = fetchedLogs.entries.first();

        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("📝 Role Update")
                .setColor("#FFDF00")
                .setDescription(`Role <@${role.id}> was just updated by <@${discordLog.executor.id}>.`)
                .setFooter(bhconfig.footer)
             return targetLogs.send(embed);
        }
        else {
            return targetLogs.send(`Role <@${role.id}> was just updated by <@${discordLog.executor.id}>`);
        }
    }
}