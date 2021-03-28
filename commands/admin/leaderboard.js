const bhconfig = require('../core/bhconfig.json');
const Discord = require("discord.js");

module.exports = {
    name: 'leaderboard',
    description: 'tracks invites',

    async execute(client, msg, args){
        args = args.join('')
        const { guild } = msg;
        if(!args || isNaN(args)){
            args = 10
        } if(args > 25){
            return msg.reply(`Max number is 25 to fit content`)
        }
        guild.fetchInvites()
            .then(invites => {
                const inviteCounter = {}

                invites.forEach((invite) => {
                    const { uses, inviter } = invite

                    const name = `${inviter}`

                    inviteCounter[name] = (inviteCounter[name] || 0) + uses;
                })

                let replyText = ''

                const sortedInvites = Object.keys(inviteCounter).sort((a, b) => inviteCounter[b] - inviteCounter[a])

                for(const invite of sortedInvites.slice(0, args)){
                    const count = inviteCounter[invite]
                    if(count > 0){ 
                        replyText += `\n${invite} has invited ${count} members`;
                    }
                }

                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Invites:")
                        .setColor("#486dAA")
                        .setDescription(replyText)
                        .setFooter('If you want to see your invites use myinvites')
                    return msg.channel.send(embed);
                }
            })
    }
}