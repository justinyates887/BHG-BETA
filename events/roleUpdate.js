const { checkLogs } = require('../commands/setup/setlogschannel');
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, role) => {
    const logs = await checkLogs(role.guild.id)
    if(logs.desired === true){
        const target = role.guild.channels.cache.find(channel => channel.id === logs.cID)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("📝 Role Update")
                .setColor("#FFDF00")
                .setDescription(`Role <@${role.id}> was just updated`)
                .setFooter(bhconfig.footer)
             return target.send(embed);
        }
        else {
            return target.send(`Role <@${role.id}> was just updated`);
        }
    }
}