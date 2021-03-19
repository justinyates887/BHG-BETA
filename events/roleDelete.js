const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, role) => {
    const logs = await checkLogs(role.guild.id)
    if(logs.desired === true){
        const target = role.guild.channels.cache.find(channel => channel.id === logs.cID)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("❌ Role Deletion")
                .setColor("#FF0000")
                .setDescription(`Role **${role.name}** was just deleted`)
                .setFooter(bhconfig.footer)
             target.send(embed);
        }
        else {
            target.send(`Role **${role.name}** was just deleted`);
        }
    }
}