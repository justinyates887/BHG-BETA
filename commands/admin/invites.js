const bhconfig = require('../core/bhconfig.json');
const Discord = require("discord.js");

module.exports = {
    name: 'invites',
    description: 'tracks invites',

    async execute(client, msg, args){
        const { guild } = msg;
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

                for(const invite of sortedInvites){
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
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            })
    }
}