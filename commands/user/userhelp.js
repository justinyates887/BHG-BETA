const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'userhelp',
    description: 'this accesses the commands list',

    execute(client, msg, args, logs, blueLogs){
        if(bhconfig.embeds === true){
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Fun Commands") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`- **${bhconfig.prefix}meme** sends a meme from r/memes\n\
                - **${bhconfig.prefix}aww** sends a meme from r/aww\n\
                - **${bhconfig.prefix}wholesome** sends a meme from r/wholesome\n\
                - **${bhconfig.prefix}hentai** well...you know uwu\n\
                - **${bhconfig.prefix}reddit** sends a meme from a specified subreddit [<command> + <subreddit>]\n\
                - **${bhconfig.prefix}roll** rolls a specified dice [ex. ${bhconfig.prefix}roll 2d20+4]\n\
                - **${bhconfig.prefix}vote** adds reactions to previous message with upvotes, downvotes, and question reactions.\n\
                - **${bhconfig.prefix}invitebot** sends an invite link for this bot\n\
                - **${bhconfig.prefix}donate** sends you links to help support this bot and keep it free! :)`)
                .setFooter(bhconfig.footer) //footer/watermark
            msg.channel.send(embed);
        }
    }
}