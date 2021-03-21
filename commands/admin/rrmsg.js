const messageSchema = require('../setup/schemas/message')
const { addToCache } = require('../../features/rr')

module.exports = {
    name: 'rrmsg',
    description: 'set rr message',

    async execute(msg, args){
        const { guild } = msg
        const targetChannel = msg.mentions.channels.first() || msg.guild.channel

        if (channels.first()) {
            args.shift()
        }

        const text = args.join(' ')

        const newMessage = await targetChannel.send(text)

        if (guild.me.hasPermission('MANAGE_MESSAGES')) {
            msg.delete()
        }

        if (!guild.me.hasPermission('MANAGE_ROLES')) {
            msg.reply(
            'The bot requires access to manage roles to be able to give or remove roles'
        )
        return
        }

        addToCache(guild.id, newMessage)

        new messageSchema({
        guildId: guild.id,
        channelId: targetChannel.id,
        messageId: newMessage.id,
        })
        .save()
        .catch(() => {
            message
            .reply('Failed to save to the database, please report this!')
            .then((message) => {
                message.delete({
                timeout: 1000 * 10,
                })
            })
        })
    },
}