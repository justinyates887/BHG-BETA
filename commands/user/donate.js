const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'donate',
    description: 'allows for users to donate to the betterment of the bot',

    execute(client, msg, args){
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Your kindness helps keep developments like this free <3") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription("**Support us on Pateron**\nhttps://www.patreon.com/smallblue\n\n**PayPal**\nhttps://www.paypal.me/justinyates887") //main text body
                .setFooter(`Blue Haired Girl By SmallBlue Dev`) //footer/watermark
            return msg.channel.send(embed);
    }
}