const bhconfig = require("../core/bhconfig.json");
const Discord = require("discord.js");
const warnSchema = require('../setup/schemas/warn-schema')
const { random } = require('../user/suggest')
const { getRoles } = require('../setup/getRoles')
const { checkLogs } = require('../setup/setlogschannel')

module.exports = {
    name: 'warn',
    description: 'sends a warning to user',

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
            wID: random(16),
            author: msg.member.user.tag,
            timestamp: new Date().toDateString(),
            target: `${target.username}#${target.discriminator}`,
            warnReason
        }
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
                return console.error(`Error at db warn.js(60): ${err}`)
            }
            
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

        const logs = await checkLogs(msg.guild.id)
        if(logs.desired === true){
            const t = msg.guild.channels.cache.find(channel => channel.id === logs.cID)
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("📝 Warning Issued")
                    .setColor("#FFDF00")
                    .setDescription(`A warning was just issued by <@${msg.member.user.id}> to <@${target}> for: ${warnReason}`)
                    .setFooter(bhconfig.footer)
                t.send(embed);
            }
            else {
                t.send(`A warning was just issued by <@${msg.user.id} to <#${target}> for: ${warnReason}`)
        }
      }


    }
}
