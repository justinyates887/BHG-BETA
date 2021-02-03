const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");
const got = require('got');

module.exports = {
    name: 'hentai',
    description: 'pulls a waifu from a list of subreddits',

    async execute(client, msg, args, logs, blueLogs){

        if(msg.channel.nsfw){
            const embed = new Discord.MessageEmbed()
            got('https://www.reddit.com/r/hentai/random/.json').then(response => {
                let content = JSON.parse(response.body);
                let permalink = content[0].data.children[0].data.permalink;
                let memeUrl = `https://reddit.com${permalink}`;
                let memeImage = content[0].data.children[0].data.url;
                let memeTitle = content[0].data.children[0].data.title;
                let memeUpvotes = content[0].data.children[0].data.ups;
                let memeDownvotes = content[0].data.children[0].data.downs;
                let memeNumComments = content[0].data.children[0].data.num_comments;
                embed.setTitle(`${memeTitle}`)
                embed.setURL(`${memeUrl}`)
                embed.setImage(memeImage)
                embed.setColor('#486dAA')
                embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
                msg.channel.send(embed);
            })
        } else {
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Naughty Naughty...")
                    .setColor("#486dAA")
                    .setDescription("This is a Safe for Work Channel")
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        }
    }
}