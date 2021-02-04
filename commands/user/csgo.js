const bhconfig = require("../core/bhconfig.json"); 
const fs = require("fs");
const Discord = require("discord.js");
const market = require('steam-market-search').market;  

module.exports = {
    name: 'csgo',
    description: 'pulls skin prices from steam market',

    async execute(client, msg, args){

        let filter = m => m.author.id === msg.author.id;

        if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Boom") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription("Please enter <desired weapon> <desired skin>") //main text body
                .setFooter(bhconfig.footer) //footer/watermark
                msg.channel.send(embed);
        }
        msg.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
        })
        .then(msg => {
            msg = msg.first();

            try{
                market.searchCSGO(msg.content).then(results => {
                    if(!results[0] || results[0] == []){
                        if (bhconfig.embeds === true) {
                            let embed = new Discord.MessageEmbed()
                                .setAuthor("Sorry...")
                                .setColor("#486dAA")
                                .setDescription("I couldn't find anything under that search.\n\
                                                 Make sure to check your spelling and that what you're looking for exists.")
                                .setFooter(bhconfig.footer)
                            return msg.channel.send(embed);
                        }
                    } else {
                        let resultArr = [];

                        for (i=0;i<results.length;i++){
                            resultArr.push(`**${results[i].name}**\n current price: \`${results[i].sale_price_text}\` total available: *${results[i].sell_listings}*\n`);
                        }

                        if (bhconfig.embeds === true) {
                            let embed = new Discord.MessageEmbed()
                                .setAuthor('CS:GO')
                                .setColor("#486dAA")
                                .setDescription(`${resultArr}`)
                                .setFooter(bhconfig.footer)
                            return msg.channel.send(embed);
                        }
                    }
                })
            } catch {
                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Sorry...")
                        .setColor("#486dAA")
                        .setDescription("I couldn't find anything under that search.")
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            }

        });

    }
}