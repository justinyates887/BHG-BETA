const bhconfig = require("../core/bhconfig.json");
const Discord = require("discord.js");
const warnSchema = require('../setup/schemas/warn-schema')
const mongo = require('../../mongo')

module.exports = {
    name: 'warn',
    description: 'sends a warning to user',

    async execute(client, msg, args, logs, blueLogs){

        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        }

        const target = msg.mentions.users.first();
        const burn = args.shift();
        const warnReason = args.join(' ');
        const guildID = msg.guild.id
        const uID = target.id
        if (!warnReason) {
            // Sets the Var reason to this:
            warnReason = "No reason provided";
        }

        if (!target) {
            if (bhconfig.embeds === true) { 
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Error!")
                    .setColor("#486dAA")
                    .setDescription("No user specified")
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        }

        if (target === msg.author.id){  // checks to see if the target is the msg author 
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Error!")
                    .setColor("#486dAA")
                    .setDescription("Why would you warn yourself? O.o")
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        }

        const warning = {
            author: msg.member.user.tag,
            timestamp: new Date().getTime(),
            warnReason
        }

        await mongo()
            .then(async mongoose => {
                try{
                    await warnSchema.findOneAndUpdate({
                      _id: uID,
                      gID: guildID  
                    }, {
                        _id: uID,
                        gID: guildID,
                        $push: {
                            warnings: warning
                        }
                    }, {
                        upsert: true
                    })
                } catch (err){
                    console.error(`Error at db warn.js(60): ${err}`)
                }
            })

        if (target && warnReason){
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Warning")
                    .setColor("#486dAA")
                    .setDescription(`${target} you have been warned: ${warnReason}`)
                    .setFooter(bhconfig.footer)
                msg.channel.send(embed);
            }
        }
    }
}
