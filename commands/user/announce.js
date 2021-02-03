const bhconfig = require("../core/bhconfig.json");  //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'announce',
    description: 'sends an announcement to targets in target channel',

    execute(client, msg, args){
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        }

        let title = [
            'Hey!',
            'Guess What?!',
            'Attention!',
            'You Should Know...',
            'Announcement!'
        ]

        let targetChannel = msg.mentions.channels.first();
        let targetChannelID = targetChannel.id;
        let targetAudience;

        if(msg.mentions.users.first()){
            targetAudience = args.splice(args.indexOf(msg.mentions.users.first()));
        } else if(msg.mentions.roles.first()){
            targetAudience = args.splice(args.indexOf(msg.mentions.roles.first()));
        } else {
            targetAudience = '';
        }
        
        let burn = args.shift();
        let message = args.join(' ')
        let random = Math.floor((Math.random() * 5));
        console.log(random);

        const { guild } = msg; 

        const target = guild.channels.cache.find((target) => {
            return target.id === targetChannelID;
        });

        if(!target){
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Yikes...") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("No target channel found...") //main text body
                    .setFooter(bhconfig.footer) //footer/watermark
                return msg.channel.send(embed);
            }
        } else if(!message){
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Yikes...") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("There was no message!") //main text body
                    .setFooter(bhconfig.footer) //footer/watermark
                return msg.channel.send(embed);
            }
        } else {
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor(title[random]) // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription(`${message}`) //main text body
                target.send(embed);
            }
            if(targetAudience !== ''){
                target.send(targetAudience + '!');
            }
        }
    }
}