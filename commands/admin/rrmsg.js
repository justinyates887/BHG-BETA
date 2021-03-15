const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");
const messageSchema = require('../setup/schemas/message');
const { addToCache } = require('../../features/rr')

module.exports = {
    name: 'rrmsg',
    description: 'Sets a message for your reaction roles',

    async execute(client, msg, args, logs, blueLogs){

        if(!msg.member.hasPermission('ADMINISTRATOR')){
            return msg.channel.send('You do not have the required permissions to use this command');
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