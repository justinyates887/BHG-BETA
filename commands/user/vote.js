const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'vote',
    description: 'adds vote reactions to messages',

    execute(client, msg, args, logs, blueLogs){
        msg.delete().then(() => {
            const { guild, channel } = msg;

            channel.messages.fetch({ limit: 1 }).then((messages) => {
                msg = messages.first();

                if(!msg) {
                    if (bhconfig.embeds === true) {
                        let embed = new Discord.MessageEmbed()
                            .setAuthor("Oops")
                            .setColor("#486dAA")
                            .setDescription("There isn't a message to vote on")
                            .setFooter(bhconfig.footer)
                        return msg.channel.send(embed);
                    }
                }

                msg.react('👍');
                msg.react('👎');
                msg.react('❓');
            })
        })
    }
}