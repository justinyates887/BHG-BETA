const { updateChannels } = require('../commands/setup/serverstats')

module.exports = async (client, member) => {
    updateChannels(member.guild.id, member.guild)
    
}