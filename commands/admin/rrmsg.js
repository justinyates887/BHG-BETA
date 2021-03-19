const bhconfig = require("../core/bhconfig.json");
const Discord = require("discord.js");
const messageSchema = require('../setup/schemas/message');
const { addToCache } = require('../../features/rr')
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'rrmsg',
    description: 'Sets a message for your reaction roles',

    async execute(client, msg, args, logs, blueLogs){

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

        if(!args[0]){
            return msg.channel.send('Incorrect usage, please specify a message! (Target channel is optional)')
        }

        const { guild, mentions } = msg
        const { channels } = mentions;
        const targetChannel = channels.first() || msg.channel

        if(channels.first()){
            args.shift();
        }

        const text = args.join(' ');
        const newMessage = await targetChannel.send(text);

        if(guild.me.hasPermission('MANAGE_MESSAGES')){
            msg.delete
        }

        if(!guild.me.hasPermission('MANAGE_ROLES')){
            msg.reply('The bot requires permissions to manage roles');
            return
        }

        addToCache(guild.id, newMessage);

        new messageSchema({
            guildID: guild.id,
            channelID: targetChannel.id,
            messageID: newMessage.id,
        }).save()
            .catch(() => {
                msg.reply('Failed to save to database, please report this bug :(')
                    .then((message) => {
                        message.delete({
                            timeout: 10000
                        })
                    })
            })
    }
}