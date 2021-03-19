const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, member) => {
    const logs = await checkLogs(member.guild.id)
    if(logs.desired === true){
        const target = member.guild.channels.cache.find(channel => channel.id === logs.cID)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("📝 User Updated")
                .setColor("#FFDF00")
                .setDescription(`User **${member.name}** has had their settings updated`)
                .setFooter(bhconfig.footer)
             target.send(embed);
        }
        else {
            target.send(`User **${member.name}** has had their settings updated`);
        }
    }
}