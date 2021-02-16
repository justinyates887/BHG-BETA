const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'startgiveaway',
    description: 'starts a giveaway with a reaction role',

    async execute(client, msg, args, logs, blueLogs){
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        }

        args = args.toString();

        if(!args || args == 'undefined'){
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Oops")
                    .setColor("#486dAA")
                    .setDescription("There isn't an emoji to react with.\n Please delete this message and try again.")
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        } else if (args){
            msg.delete().then(() => {
                const { guild, channel } = msg;

                channel.messages.fetch({ limit: 1 }).then((messages) => {
                    msg = messages.first();

                    if(!msg) {
                        if (bhconfig.embeds === true) {
                            let embed = new Discord.MessageEmbed()
                                .setAuthor("Oops")
                                .setColor("#486dAA")
                                .setDescription("There isn't a message to start a giveaway on")
                                .setFooter(bhconfig.footer)
                            return msg.channel.send(embed);
                        }
                    }

                    //finds custom emojis
                    if(args.includes(':')) {
                        const split = args.split(':');
                        const emojiName = split[1];

                        args = guild.emojis.chache.find((emoji) => {
                            return emoji.name === emojiName;
                        })
                    }

                    msg.react(args);

                    if (logs === true) {
                        let embed = new Discord.MessageEmbed()
                            .setAuthor("Action | Giveaway Started") 
                            .setColor("#486dAA")
                            .setDescription(`A giveaway was started by ${msg.author} in channel ${msg.channel}`)
                            .setFooter(bhconfig.footer)
                        blueLogs.send(embed);
                    } 
                })
            })
        }
    }
}