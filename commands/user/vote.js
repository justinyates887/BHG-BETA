const Discord = require("discord.js"); 
const fs = require("fs");
const bhconfig = require("../core/bhconfig.json"); 

module.exports = {
    name: 'vote',
    description: 'This is a vote command for top.gg',

    execute(client, msg, args){
        if(bhconfig.embeds === true){
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Help") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`- Vote for our bot on top.gg : https://top.gg/bot/794674548875460649 `) //main text body
                .setFooter("Blue Haired Girl By SmallBlue Dev") //footer/watermark
            msg.channel.send(embed);
        }
    }
}