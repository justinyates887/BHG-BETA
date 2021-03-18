const serverStatsSchema = require('./schemas/server-stats-schema');
const mongo = require('../../mongo');

module.exports = {
    name: 'serverstats',
    description: 'gives you and auto updates the guild stats',

    async execute(client, msg){
        if(!msg.member.hasPermission('ADMINISTRATOR')){
            return msg.reply('You do not have permission to use this command')
        }

        const { guild } = msg
        const guildUsers = guild.members.cache.filter(member => !member.user.bot).size;
        const guildBots = guild.members.cache.filter(member => member.user.bot).size
        const guildRoles = guild.roles.cache.size
        const guildChannels = guild.channels.cache.size

        await guild.channels.create(`Members: ${guildUsers}`, {
            type: 'voice',
            })

        await guild.channels.create(`Bots: ${guildBots}`, {
            type: 'voice',
            })

        await guild.channels.create(`Channels: ${guildChannels}`, {
            type: 'voice',
            })

        await guild.channels.create(`Roles: ${guildRoles}`, {
            type: 'voice',
            })
        
        const membersChannel = guild.channels.cache.find((channel) => {
            return channel.name === `Members: ${guildUsers}`;
        });

        const botsChannel = guild.channels.cache.find((channel) => {
            return channel.name === `Bots: ${guildBots}`;
        });

        const channelsChannel = guild.channels.cache.find((channel) => {
            return channel.name === `Channels: ${guildChannels}`;
        });

        const rolesChannel = guild.channels.cache.find((channel) => {
            return channel.name === `Roles: ${guildRoles}`;
        });

        await mongo()
        .then(async mongoose => {
            try{
                await serverStatsSchema.findOneAndUpdate({
                    _id: msg.guild.id,
                }, {
                    users: [membersChannel.id, guildUsers],
                    roles: [rolesChannel.id, guildRoles],
                    channels: [channelsChannel.id, guildChannels],
                    bots: [botsChannel.id, guildBots]
                }, {
                    upsert: true
                })
            } catch(err){
                return console.error(`Error at serverstats.js(65): ${err}`)
            }
        })
    }
}

module.exports.updateChannels = async (guildID, guild) => {
    await mongo()
    .then(async mongoose => {
        try{
            await serverStatsSchema.findOne({ _id: guildID })
            .then(async result => {
                console.log(result)

                const membersChannel = guild.channels.cache.find((channel) => {
                    return channel.id === `${result.users[0]}`;
                });
                membersChannel.setName(`Members: ${guild.members.cache.filter(member => !member.user.bot).size}`)
                membersChannel.permissionOverwrites.update({
                    CONNECT: false
                })

                const rolesChannel = guild.channels.cache.find((channel) => {
                    return channel.id === `${result.roles[0]}`;
                });
                rolesChannel.setName(`Roles: ${guild.roles.cache.size}`)
                rolesChannel.permissionOverwrites.update({
                    CONNECT: false
                })

                const channelsChannel = guild.channels.cache.find((channel) => {
                    return channel.id === `${result.channels[0]}`;
                });
                channelsChannel.setName(`Channels: ${guild.channels.cache.size}`)
                channelsChannel.permissionOverwrites.update({
                    CONNECT: false
                })

                const botsChannel = guild.channels.cache.find((channel) => {
                    return channel.id === `${result.bots[0]}`;
                });
                botsChannel.setName(`Bots: ${guild.members.cache.filter(member => member.user.bot).size}`)
                botsChannel.permissionOverwrites.update({
                    CONNECT: false
                })

                await serverStatsSchema.findOneAndUpdate({
                    _id: guildID
                },{
                    $addToSet: {
                        users: [membersChannel.id, guild.members.cache.filter(member => !member.user.bot).size],
                        roles: [rolesChannel.id, guild.roles.cache.size],
                        channels: [channelsChannel.id, guild.channels.cache.size],
                        bots: [botsChannel.id, guild.members.cache.filter(member => member.user.bot).size]
                    },
                }, {
                    upsert: true
                })
            })
        } catch(err){
            console.error(`Error at updateChannels(serverstats.js)(97): ${err}`)
        }
    })
}