const { updateChannels } = require('../commands/setup/serverstats')
const { checkLogs } = require('../commands/setup/setlogschannel')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, member) => {
    updateChannels(member.guild.id, member.guild);

    console.log(member)

    const logs = await checkLogs(member.guild.id)
    if(logs.desired === true){
        const target = member.guild.channels.cache.find(channel => channel.id === logs.cID)
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("❌ Member Left")
                .setColor("#FF0000")
                .setDescription(`Member **${member.user.username}** left`)
                .setFooter(bhconfig.footer)
                .setTimestamp()
             return target.send(embed);
        }
        else {
            return target.send(`Member **${member.user.username}** left`);
        }
    }
}