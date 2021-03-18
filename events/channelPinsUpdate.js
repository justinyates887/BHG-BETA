const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, channel) => {
    const logs = await checkLogs(channel.guild.id)
    if(logs.desired === true){
        const target = channel.guild.channels.cache.find(channel => channel.id === logs.cID)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("📝 Channel Pins Updated")
                .setColor("#FFDF00")
                .setDescription(`Pins updated in channel <#${channel.id}>`)
                .setFooter(bhconfig.footer)
             target.send(embed);
        }
        else {
            target.send(`Pins updated in channel <#${channel.id}>`);
        }
    }
}