const serverStatsSchema = require('./schemas/server-stats-schema');
const mongo = require('../../mongo');
const { getRoles } = require('./getRoles')

module.exports = {
    name: 'serverstats',
    description: 'gives you and auto updates the guild stats',

    async execute(client, msg){
        const admin = await getRoles(msg.guild.id)
        const checkRoles = function(admin){
            if(admin && admin.admin){
                let result;
                for(let i = 0; i < admin.admin.length; i++){
                    const role =  msg.member.guild.roles.cache.find(r => r.id === admin.admin[i])
                    if(admin.admin[i] === role.id){
                        result = true
                    } else {
                        result = false
                    }
                }
                return result
            }
        }

        if(!msg.member.hasPermission('ADMINISTRATOR') && checkRoles(admin) === false){
            return msg.channel.send('Missing permissions');
        }

        const { guild } = msg
        const guildUsers = guild.members.cache.filter(member => !member.user.bot).size;
        const guildBots = guild.members.cache.filter(member => member.user.bot).size
        const guildRoles = guild.roles.cache.size
        const guildChannels = guild.channels.cache.size

        const category = await guild.channels.create('📈 Server Stats', {
            type: 'category'
        })

        await guild.channels.create(`Members: ${guildUsers}`, {
            type: 'voice',
            parent: category.id,
            permissionOverwrites: [{
                id: msg.guild.id,
                deny: ["CONNECT"]
            }]
            })

        await guild.channels.create(`Bots: ${guildBots}`, {
            type: 'voice',
            parent: category.id,
            permissionOverwrites: [{
                id: msg.guild.id,
                deny: ["CONNECT"]
            }]
            })

        await guild.channels.create(`Channels: ${guildChannels}`, {
            type: 'voice',
            parent: category.id,
            permissionOverwrites: [{
                id: msg.guild.id,
                deny: ["CONNECT"]
            }]
            })

        await guild.channels.create(`Roles: ${guildRoles}`, {
            type: 'voice',
            parent: category.id,
            permissionOverwrites: [{
                id: msg.guild.id,
                deny: ["CONNECT"]
            }]
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
            return
        } catch(err){
            return console.error(`Error at serverstats.js(65): ${err}`)
        }
    }
}

module.exports.updateChannels = async (guildID, guild) => {
    try{
        await serverStatsSchema.findOne({ _id: guildID })
        .then(async result => {
            const membersChannel = guild.channels.cache.find((channel) => {
                return channel.id === `${result.users[0]}`;
            });
            membersChannel.setName(`Members: ${guild.members.cache.filter(member => !member.user.bot).size}`)

            const rolesChannel = guild.channels.cache.find((channel) => {
                return channel.id === `${result.roles[0]}`;
            });
            rolesChannel.setName(`Roles: ${guild.roles.cache.size}`)

            const channelsChannel = guild.channels.cache.find((channel) => {
                return channel.id === `${result.channels[0]}`;
            });
            channelsChannel.setName(`Channels: ${guild.channels.cache.size}`)

            const botsChannel = guild.channels.cache.find((channel) => {
                return channel.id === `${result.bots[0]}`;
            });
            botsChannel.setName(`Bots: ${guild.members.cache.filter(member => member.user.bot).size}`)

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
        return console.error(`Error at updateChannels(serverstats.js)(97): ${err}`)
    }
}