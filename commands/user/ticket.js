const { getTicketCat } = require('../setup/setticketcategory')

module.exports = {
    name: 'ticket',
    description: 'creates a cupport ticket in private channel',

    async execute(client, msg, args){
        const catID = await getTicketCat(msg.guild.id)
        if(!catID.cID || catID.cID === null){
            return msg.reply(`The server owners have not yet configured tickets for this server.`)
        }
        const channel = msg.guild.channels.cache.find(c => c.name === `ticket-${msg.member.id}`)
        if(channel){
            return msg.reply(`You already have a ticket open.`)
        }

        msg.guild.channels.create(`ticket-${msg.member.id}`, {
            type: 'text',
            parent: `${catID.cID}`,
            permissionOverwrites:[
            {
                id: msg.guild.id,
                deny: ['VIEW_CHANNEL']
            }, 
            {
                id: msg.author.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
            }
            ]
        }).then(async channel => {
            msg.reply(`Your ticket has been created in <#${channel.id}>`)
            msg.delete()
            return channel.send(`${msg.author}, Welcome to your ticket! Please let us know what we can help you with. Someone will be with you shortly!`)
        })
    }
}