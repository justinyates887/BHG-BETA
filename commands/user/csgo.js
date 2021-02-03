const bhconfig = require("../core/bhconfig.json"); 
const fs = require("fs");
const Discord = require("discord.js");
const got = require('got');

module.exports = {
    name: 'csgo',
    description: 'pulls skin prices from steam market',

    execute(client, msg, args, logs, blueLogs){
        let gun = args.shift().toUpperCase();
        let wearRating = args.pop();
        let join = args.join(' ');
        let skin = join.charAt(0).toUpperCase() + join.slice(1)
        const appId = 730;
        const apiKey = process.env.apiKey;
        let marketHashName = `${gun}` + ' | ' + `${skin}` + ` (${wearRating})`

        try{
            got(`http://api.steamapis.com/market/item/${appId}/${marketHashName}?api_key=${apiKey}`).then(response => {
                let content = JSON.parse(response.body);
                let url = content.url;
                let image = content.image;
                let hash = content.market_name;
                let price = content.median_avg_prices_15days;
                embed.setTitle(`${hash}`)
                embed.setURL(`${url}`)
                embed.setImage(image)
                embed.setColor('#486dAA')
                embed.setFooter(`The median price in the past 15 days is **${price}**`)
                msg.channel.send(embed);
            })
        } catch {
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Uh oh")
                    .setColor("#486dAA")
                    .setDescription("I couldn't find that skin. Check your command for formatting\n\n**Example:** b!csgo AK-47 Redline Battle-Scarred\n\nFor more help and a list of search terms use b!csgohelp")
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        }



    }
}