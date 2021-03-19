const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, role) => {
    const logs = await checkLogs(role.guild.id)
    if(logs.desired === true){
        const target = role.guild.channels.cache.find(channel => channel.id === logs.cID)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("✅ Role Created")
                .setColor("#008000")
                .setDescription(`Role <@${role.id}> was just created`)
                .setFooter(bhconfig.footer)
             target.send(embed);
        }
        else {
            target.send(`Role <#${role.id}> was just created`);
        }
    }
}