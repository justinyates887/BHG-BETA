const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'invitelink',
    description: 'creates a permanant invite link for the channel',

    async execute(client, msg, args, logs, blueLogs){

        let invite = await msg.channel.createInvite({
            maxAge: 0, // 0 = infinite expiration
            maxUses: 0 // 0 = infinite uses
          })

        if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Growing, are we?") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`Here is your permanant invite link!\n ${invite}`) //main text body
                .setFooter(bhconfig.footer) //footer/watermark
            return msg.channel.send(embed);
        }
    }
}