const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const Discord = require("discord.js");
const { checkLogs } = require('../setup/setlogschannel')
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'endgiveaway',
    description: 'ends a giveaway',

    async execute(client, msg, args){
        const admin = await getRoles(msg.guild.id)
        const checkRoles = function(admin){
            if(admin && admin.admin){
                let result;
                for(let i = 0; i < admin.admin.length; i++){
                    const role =  msg.member.guild.roles.cache.find(r => r.id === admin.admin[i])
                    if(admin.admin[i] === role.id){
                        result = true
                    } else {
                        result = false
                    }
                }
                return result
            }
        }

        if(!msg.member.hasPermission('ADMINISTRATOR') && checkRoles(admin) === false){
            return msg.channel.send('Missing permissions');
        }

        msg.delete().then(async () => {
            const { channel } = msg;

            channel.messages.fetch({ limit: 1 }).then(async (messages) => {
                msg = messages.first();

                if(!msg) {
                    if (bhconfig.embeds === true) {
                        let embed = new Discord.MessageEmbed()
                            .setAuthor("Oops")
                            .setColor("#486dAA")
                            .setDescription("There isn;t a message to start a giveaway on")
                            .setFooter(bhconfig.footer)
                        return msg.channel.send(embed);
                    }
                }

                const { users } = await msg.reactions.cache.first().fetch();
                const reactionsUsers = await users.fetch();
                const possibleWinners = reactionsUsers.array().filter((user) => {
                    return !user.bot;
                });
                const winner = possibleWinners[Math.floor(Math.random() * possibleWinners.length)]

                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("CONGRATS!!!!")
                        .setColor("#486dAA")
                        .setDescription(`${winner}, you won the giveaway! You will recieve a message soon about the details.`)
                        .setFooter(bhconfig.footer)
                    msg.channel.send(embed);
                }  
            }) 
        })
        const logs = await checkLogs(msg.user.guild.id)
        if(logs.desired === true){
            const target = msg.user.guild.channels.cache.find(channel => channel.id === logs.cID)
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("📝 Giveaway Ended!")
                    .setColor("#FFDF00")
                    .setDescription(`A giveaway was just ended by <@${msg.user.id} in <#${msg.channel.id}>:\n\n\
                                        **Winner:** ${winner}`)
                    .setFooter(bhconfig.footer)
                target.send(embed);
            }
            else {
                target.send(`A giveaway was just ended by <@${msg.user.id} in <#${msg.channel.id}>:\n\n\
                **Winner:** ${winner}`);
        }
      }
    }
}