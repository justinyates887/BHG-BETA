const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'kick',
    description: "This kick\'s player!",

    execute(client, msg, args, logs, blueLogs){
        const botMe = "794674548875460649"
        var kickReason; 
        const target = msg.mentions.users.first();
        
        if(msg.member.roles.cache.has(bhconfig.adminRole)){
            // Allows only members with the admin role to kick players
                   kickReason = args.slice(1).join(" ");
               if (!target) {
                   if (bhconfig.embeds === true) {
                       let embed = new Discord.MessageEmbed()
                           .setAuthor("Error!")
                           .setColor("#486dAA")
                           .setDescription("No target found please @ the target your trying to kick")
                           .setFooter(bhconfig.footer)
                       return msg.channel.send(embed);
               }
           }
        if (!kickReason) {
            // Sets the Var reason to this:
            kickReason = "No reason provided";
        }
        if (target.id === botMe) {
            if (bhconfig.embeds === true) {
                 let embed = new Discord.MessageEmbed()
                    .setAuthor("Ouch!")
                    .setColor("#486dAA")
                    .setDescription("That hurt....")
                    .setFooter(bhconfig.footer)
                    return msg.channel.send(embed)
            } else {
                return msg.channel.send("Ouch!");
            }
        }
        if (target.id === msg.author.id){ 
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Error!")
                    .setColor("#486dAA")
                    .setDescription("You cannot kick yourself")
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            } else {
                return msg.channel.send("You cannot kick yourself.");
            }
        }
        if(target){
            const memberTarget = msg.guild.members.cache.get(target.id);
            memberTarget.kick({
            });
        }else{
            msg.channel.send(`Could not kick member`);
        }
        var embeds1;
        console.log(args);
        // Then it will send this embed to say
        // that the user has been banned
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("Kicked")
                .setColor("#486dAA")
                .setDescription(bhconfig.userKicked
                    .replace(/{user}/g, target)
                    .replace(/{userID}/g, target.id)
                    .replace(/{staffMember}/g, msg.author)
                    .replace(/{reason}/g, kickReason))
                .setFooter(bhconfig.footer);
            msg.channel.send(embed);
        } else {
            msg.channel.send(bhconfig.userKicked
                .replace(/{user}/g, target)
                .replace(/{userID}/g, target.id)
                .replace(/{staffMember}/g, msg.author)
                .replace(/{reason}/g, kickReason));
        }

        // Logs
        if (logs === true) {
            let kickEmbed = new Discord.MessageEmbed()
                .setAuthor("Action | User kicked")
                .setColor("#486dAA")
                .setDescription(bhconfig.userKicked
                    .replace(/{user}/g, target)
                    .replace(/{userID}/g, target.id)
                    .replace(/{staffMember}/g, msg.author)
                    .replace(/{reason}/g, kickReason))
                .setFooter(bhconfig.footer);
            blueLogs.send(kickEmbed);
        } else {
        msg.channel.send('Log failed please enable embeds :(')
    }
}
    }
}
