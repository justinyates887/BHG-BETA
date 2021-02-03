const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'invitebot',
    description: 'sends a link to invite the bot to a server',

    execute(client, msg, args){
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Thanks for Supporting!") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription("- Here is the invite link for the main bot: https://tinyurl.com/ysesvxdb \n\n\
                - Here is an invite link for the music bot: https://tinyurl.com/bkcggzki") //main text body
                .setFooter(`Blue Haired Girl By SmallBlue Dev`) //footer/watermark
            return msg.channel.send(embed);
    }
}