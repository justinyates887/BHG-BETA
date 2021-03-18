const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, user) => {
    const logs = await checkLogs(channel.guild.id)
    if(logs.desired === true){
        const target = user.guild.channels.cache.find(channel => channel.id === logs.cID)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("❌ User Banned")
                .setColor("#FF0000")
                .setDescription(`User **${user.name}** has been banned`)
                .setFooter(bhconfig.footer)
             target.send(embed);
        }
        else {
            target.send(`User **${user.name}** has been banned`);
        }
    }
}