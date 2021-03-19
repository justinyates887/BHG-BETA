const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const Discord = require("discord.js");
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'deleterole',
    description: 'deletes a role from the server',

    async execute(client, msg, args){

        let roleName = msg.mentions.roles.first();
        let roleNameID = roleName.id;

        const { guild } = msg;

        const role = guild.roles.cache.find((role) => {
             return role.id === roleNameID;
         });


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