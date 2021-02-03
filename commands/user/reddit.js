const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");
const got = require('got');

module.exports = {
    name: 'reddit',
    description: 'pulls a random meme from given sub',

    async execute(client, msg, args, logs, blueLogs){

        let subreddit = args.join('');

        if(!subreddit){
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Owo")
                    .setColor("#486dAA")
                    .setDescription("No subreddit specified.")
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        }

        const embed = new Discord.MessageEmbed()
        got(`https://www.reddit.com/r/${subreddit}/random/.json`).then(response => {
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
    }
}