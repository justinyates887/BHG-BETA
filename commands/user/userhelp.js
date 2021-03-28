const bhconfig = require("../core/bhconfig.json");
const Discord = require("discord.js");
const mongo = require("../../mongo");
const prefixSchema = require('../setup/schemas/command-prefix-schema')

module.exports = {
    name: 'userhelp',
    description: 'this accesses the commands list',

    async execute(client, msg, args, logs, blueLogs){
        const prefix = await mongo()
        .then(async mongoose => {
            try{
                const result = await prefixSchema.findOne({
                    _id: msg.guild.id
                })
                return result.prefix
            } catch(err) {
                return
            }
        }) || 'b!'

        if(bhconfig.embeds === true){
            let embed = new Discord.MessageEmbed()
                .setAuthor("The Blue Haired Girl", 'https://i.imgur.com/RhSdj8j.png', 'https://tinyurl.com/ysesvxdb')
                .setTitle('Join The Discord')
                .setURL('https://discord.gg/FqbRWkgfcT')
                .setColor("#486dAA")
                .setDescription(`Here's some user commands for you to use!`)
                .setThumbnail(msg.guild.iconURL())
                .addFields(
                    { name: 'Like the bot?', value: 'Click the name at the top to invite her to your server!'},
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Economy', value: `> ${prefix}pay (allows you to pay another user coins you have been given)\n\
                                               > ${prefix}balance (allows you to see your current coin balance)` },
                    { name: `Interaction`, value: `> ${prefix}invitelink (creates an infinite invite link for the current server)\n\
                                                    > ${prefix}myinvites or leaderboard (shows invite stats)\n\
                                                    > ${prefix}suggest (Requires guild owner setup, sends a suggestion in an embed that can then be accepted by staff)\n\
                                                    > ${prefix}verify (Requires guild owner setup, sends you a captcha to complete and gives you the server\`s member role)\n\
                                                    > ${prefix}ticket (Requires guild owner setup, allows you to create a private ticket with staff)\n\
                                                    > ${prefix}upvote (adds upvote and downvote reactions to a message)`},
                    { name: `Fun`, value: `> ${prefix}roll (Rolls a specified dice and modifier) <roll d20+3>\n\
                                            > ${prefix}magic8 (Ask the magic 8-ball a question!`},
                    { name: `Utility`, value: `> ${prefix}tempconvert (Converts temperature from Celcius, Farenheit, or Kelvin) <tempconvert 100F> (converts to celcius and kelvin)`},
                    { name: `Reddit`, value: `> ${prefix}aww (sends a meme from r/aww)\n\
                                               > ${prefix}meme (sends a meme from r/meme)\n\
                                               > ${prefix}wholesome (sends a meme from r/wholesome)\n\
                                               > ${prefix}hentai (requires NSFW channel)\n\
                                               > ${prefix}reddit (allows you to specify a subreddit to pull from <reddit dankmemes>`},
                    { name: `Steam Market`, value: `> ${prefix}csgo (allows you to enter a csgo weapon skin and pulls data from steam) [wait for response]\n\
                                                    > ${prefix}dota (allows you to enter a dota item and pulls data from steam market)\n\
                                                    > ${prefix}tf2 (allows you to enter a tf2 item and pulls data from steam market\n\
                                                    > ${prefix}rust (you get the idea)`},
                    { name: 'Music', value: `> ${prefix}play (searches youtube for your request)\n\
                                              >  ${prefix}loop (loops the current song)\n\
                                               > ${prefix}nowplaying (tells you what is now playing)\n\
                                               > ${prefix}pause (pauses music)\n\
                                               > ${prefix}resume (resumes playing)\n\
                                               > ${prefix}skip (skips to next song in queue)\n\
                                               > ${prefix}stop (disconnects the bot)\n\
                                               > ${prefix}volume (allows for adjustment of volume)\n\
                                               > ${prefix}filters (allows you to see the filters you can add)\n\
                                               > ${prefix}filter (adds filter to music)\n\
                                               > ${prefix}clear-queue (clears current queue)`}
                )
                .setTimestamp()
                .setFooter("Blue Haired Girl By SmallBlue Dev")
            msg.channel.send(embed);
        }
    }
}
