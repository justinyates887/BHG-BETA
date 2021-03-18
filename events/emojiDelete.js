const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, emoji) => {
    const logs = await checkLogs(emoji.guild.id)
    if(logs.desired === true){
        const target = emoji.guild.channels.cache.find(channel => channel.id === logs.cID)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor(`❌ Emoji Deleted`)
                .setColor("#FF0000")
                .setDescription(`Server emoji **${emoji.name}** deleted`)
                .setFooter(bhconfig.footer)
             target.send(embed);
        }
        else {
            target.send(`Server emoji **${emoji.name}** deleted`);
        }
    }
}