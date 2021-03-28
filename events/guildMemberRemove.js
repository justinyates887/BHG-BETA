const { updateChannels } = require('../commands/setup/serverstats')
const { checkLogs } = require('../commands/setup/setlogschannel')
const profileSchema = require('../commands/setup/schemas/profile-schema')
const bhconfig = require('../commands/core/bhconfig.json')
const Discord = require('discord.js')

module.exports = async (client, member, guild) => {
    updateChannels(member.guild.id, member.guild);
    removeProfile(member.id, member.user.id)

    const logs = await checkLogs(member.guild.id)
    if(logs && logs.desired === true){
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

const removeProfile = (member, guild) => {
    try{
        profileSchema.findOneAndDelete({
            _id: member,
            gID: guild
        })
    } catch(err){
        throw new Error
    }
}