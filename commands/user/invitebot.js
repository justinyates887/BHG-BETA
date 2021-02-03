const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'invitebot',
    description: 'sends a link to invite the bot to a server',

    execute(client, msg, args, logs, blueLogs){
        if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Thanks for Supporting!") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription("Here is the invite link for this bot:\n  https://tinyurl.com/ysesvxdb\n\
                                Here is the link for the Music Bot: https://tinyurl.com/bkcggzki") //main text body
                .setFooter(bhconfig.footer) //footer/watermark
            return msg.channel.send(embed);
        }
    }
}