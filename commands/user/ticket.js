const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");
let registered = false;

const registerEvent = (client, channelSend, logs, blueLogs) => {
    if(registered){
        return
    }

    registered = true;

    client.on('messageReactionAdd', (reaction, user) => {
        if(user.bot){
            return
        }
        const { message } = reaction;
        if(message.channel.id === channelSend){
            message.delete();
        }
        
        if(logs === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("Action | Ticket Closed") 
                .setColor("#486dAA")
                .setDescription(`Ticket sent by ${userMessage.author} was closed.`)
                .setFooter(bhconfig.footer)
            blueLogs.send(embed);
        } 
    })
}

module.exports = {
    name: 'ticket',
    description: 'creates a cupport ticket in private channel',

    execute(client, msg, args, logs, blueLogs){
        const rand = Math.floor((Math.random() * 1000) + 1)
        userMessage = args.join(' ');

        msg.guild.channels.create(`ticket-${rand}`, {
            type: 'text',
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    allow: ['VIEW_CHANNEL'],
                }]
            })

        let channelID =  msg.guild.channels.cache.find(c => c.name === (`ticket-${rand}`));
        console.log(channelID)
        let channelSend = channelID.id;
        const channel = guild.channels.cache.get(channelSend)

        registerEvent(client, channelSend);
        let message = args.join(' ');
        let check = '✔️';

        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("")
                .setColor("#486dAA")
                .setDescription(`A new ticket has been created by ${userMessage.author}\n\n${message}\n\nClick the ${check} to complete the request`)
                .setFooter(bhconfig.footer)
            channel.send(embed)
                .then(ticketMessage => {
                    ticketMessage.react(check)

                    userMessage.reply('Youre ticket has been sent! Expect a reply shortly.')

                    if (logs === true) {
                        let embed = new Discord.MessageEmbed()
                            .setAuthor("Action | Ticket Created") 
                            .setColor("#486dAA")
                            .setDescription(`A ticket was created by ${userMessage.author}`)
                            .setFooter(bhconfig.footer)
                        blueLogs.send(embed);
                    } 
                })
        }
    }
}