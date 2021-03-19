const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const Discord = require("discord.js");
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'removerole',
    description: 'takes role from specified user',

    async execute(client, msg, args, logs, blueLogs){
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