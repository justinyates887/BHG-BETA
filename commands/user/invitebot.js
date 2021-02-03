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
                .setDescription("Here is the invite link:\n https://discord.com/api/oauth2/authorize?client_id=794674548875460649&permissions=8&scope=bot") //main text body
                .setFooter(bhconfig.footer) //footer/watermark
            return msg.channel.send(embed);
        }
    }
}