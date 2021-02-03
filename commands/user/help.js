const Discord = require("discord.js"); 
const fs = require("fs");
const bhconfig = require("../core/bhconfig.json"); 

module.exports = {
    name: 'help',
    description: 'this accesses the commands list',

    execute(client, msg, args){
        if(bhconfig.embeds === true){
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Help") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`- **${bhconfig.prefix}adminhelp** for list of admin commands\n\
                - **${bhconfig.prefix}userhelp** for list of user commands\n\
                - **${bhconfig.prefix}musichelp** for list of music commands`) //main text body
                .setFooter("Blue Haired Girl By SmallBlue Dev") //footer/watermark
            msg.channel.send(embed);
        }
    }
}