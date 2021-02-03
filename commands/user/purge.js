const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'purge',
    description: 'purges a select number of chats',

    async execute(client, msg, args, logs, blueLogs){
        const amount = args.join(' '); //We want the argument (number) to be the amount, so we do a join on the arg.
        const user = msg.author.id;

        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        }

        if(!amount){
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Nope!") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("No number specified!") //main text body
                    .setFooter(bhconfig.footer) //footer/watermark
                return msg.channel.send(embed);
            }
        } else if (isNaN(amount)){
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Nope!") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("You need to use a number!") //main text body
                    .setFooter(bhconfig.footer) //footer/watermark
                return msg.channel.send(embed);
            }
        } else if (amount > 100) {
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Nope!") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("Discord only lets me delete 100 messages at a time :(") //main text body
                    .setFooter(bhconfig.footer) //footer/watermark
                return msg.channel.send(embed);
            }

        } else{
            await msg.channel.messages.fetch({ limit: args }) //Specify the limit (amount) of messages to fetch.
                .then(messages => { // Fetches the messages from the current channel
                    msg.channel.bulkDelete(messages) //deletes messages
            });
        }

        if (logs === true) {
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Action | Purge") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`${amount} message's purged from ${msg.channel} by ${user}`) //main text body
                .setFooter(bhconfig.footer) //footer/watermark
            blueLogs.send(embed);
        } 
    }
  }

