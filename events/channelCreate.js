//channelCreate event
const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, channel) => {
    const logs = await checkLogs(channel.guild.id)
    if(logs.desired === true){
        const target = channel.guild.channels.cache.find(channel => channel.id === logs.cID)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("✅ Channel Created")
                .setColor("#008000")
                .setDescription(`Channel <#${channel.id}> was just created`)
                .setFooter(bhconfig.footer)
             target.send(embed);
        }
        else {
            target.send(`Channel <#${channel.id}> was just created`);
        }
    }
}