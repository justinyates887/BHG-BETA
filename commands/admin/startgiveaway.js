const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const Discord = require("discord.js");
const { checkLogs } = require('../setup/setlogschannel')
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'startgiveaway',
    description: 'starts a giveaway with a reaction role',

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

        args = args.toString();

        if(!args || args == 'undefined'){
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Oops")
                    .setColor("#486dAA")
                    .setDescription("There isn't an emoji to react with.\n Please delete this message and try again.")
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        } else if (args){
            msg.delete().then(async () => {
                const { guild, channel } = msg;

                channel.messages.fetch({ limit: 1 }).then(async (messages) => {
                    msg = messages.first();

                    if(!msg) {
                        if (bhconfig.embeds === true) {
                            let embed = new Discord.MessageEmbed()
                                .setAuthor("Oops")
                                .setColor("#486dAA")
                                .setDescription("There isn't a message to start a giveaway on")
                                .setFooter(bhconfig.footer)
                            return msg.channel.send(embed);
                        }
                    }

                    //finds custom emojis
                    if(args.includes(':')) {
                        const split = args.split(':');
                        const emojiName = split[1];
                        console.log(emojiName)

                        args = guild.emojis.cache.find((emoji) => {emoji.name === emojiName})
                        console.log(args.id)
                    }

                    msg.react(args);

                    const logs = await checkLogs(msg.user.guild.id)
                    if(logs.desired === true){
                        const target = msg.user.guild.channels.cache.find(channel => channel.id === logs.cID)
                        if (bhconfig.embeds === true) {
                            let embed = new Discord.MessageEmbed()
                                .setAuthor("📝 Giveaway Started!")
                                .setColor("#FFDF00")
                                .setDescription(`A giveaway was just started by <@${msg.user.id} in <#${msg.channel.id}>:`)
                                .setFooter(bhconfig.footer)
                            target.send(embed);
                        }
                        else {
                            target.send(`A giveaway was just started by <@${msg.user.id} in <#${msg.channel.id}>:`)
                    }
                  }
                })
            })
        }
    }
}