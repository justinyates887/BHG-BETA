const bhconfig = require("../core/bhconfig.json");  //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'createrole',
    description: 'creates a role in the server',

    async execute(client, msg, args, logs, blueLogs){
        let roleColor = args.shift();
        let roleName = args.join(' ');

        if(!roleName){
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Uh oh...")
                    .setColor("#486dAA") //Side bar color
                    .setDescription("Did you specify a name and a hex color?\n If you dont want a color just type a random key after the command.")
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        } else if(!roleColor.startsWith('#')){
            roleColor = '#ffffff'
        }

        let roleNew = await msg.guild.roles.create({
            data:{
                name: roleName,
                color: roleColor,
            }
        })

        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("Hooray!")
                .setColor("#486dAA") //Side bar color
                .setDescription(`New role ${roleName} has been created!`)
                .setFooter(bhconfig.footer)
             msg.channel.send(embed);
        }

        if (logs === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("Action | Role Created") // Header of card
                .setColor("#486dAA")
                .setDescription(`${roleName} was created and added to channel roles by ${msg.author}.`)
                .setFooter(bhconfig.footer)
            blueLogs.send(embed);
        } 
    }
}