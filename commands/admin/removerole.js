const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'removerole',
    description: 'takes role from specified user',

    async execute(client, msg, args, logs, blueLogs){
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        }

        let rMember = msg.mentions.users.first();

        if (!rMember){
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Hmmmm...") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("Did you mention a user?") //main text body
                    .setFooter(bhconfig.footer) //footer/watermark
                return msg.channel.send(embed);
            }
        }

        let roleName = msg.mentions.roles.first();
        let roleNameID = roleName.id;

        const { guild } = msg;

        const role = guild.roles.cache.find((role) => {
             return role.id === roleNameID;
         });

        if (!role){
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Hmmmm...") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("Did you specify a role?") //main text body
                    .setFooter(bhconfig.footer) //footer/watermark
                return msg.channel.send(embed);
            }
        }

        const member = guild.members.cache.get(rMember.id);
        member.roles.remove(role);

        if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Yikes") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`${member} now has lost the role ${role}.`) //main text body
                .setFooter(bhconfig.footer) //footer/watermark
            msg.channel.send(embed);
        }

        if (logs === true) {
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Action | Role Removed") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`${member} has now lost the role ${role} by ${msg.author}.`) //main text body
                .setFooter(bhconfig.footer) //footer/watermark
            blueLogs.send(embed);
        } 
    }
}