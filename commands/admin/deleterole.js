const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'deleterole',
    description: 'deletes a role from the server',

    execute(client, msg, args, logs, blueLogs){

        let roleName = msg.mentions.roles.first();
        let roleNameID = roleName.id;

        const { guild } = msg;

        const role = guild.roles.cache.find((role) => {
             return role.id === roleNameID;
         });


        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions');
        }

        if(!role){
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("That's not good...")
                    .setColor("#486dAA")
                    .setDescription("You didn't specify a role!")
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        }

        role.delete()

        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("Yeet")
                .setColor("#486dAA")
                .setDescription(`The role ${role} was deleted`)
                .setFooter(bhconfig.footer)
            msg.channel.send(embed);
        }

        if (logs === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("Action | Role Deleted") 
                .setColor("#486dAA")
                .setDescription(`The role ${role} was deleted by ${msg.author}.`)
                .setFooter(bhconfig.footer)
            blueLogs.send(embed);
        } 
    }
}