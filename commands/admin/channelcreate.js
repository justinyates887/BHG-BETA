const bhconfig = require("../core/bhconfig.json");  //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'channelcreate',
    description: 'creates a channel, can target category',

    execute(client, msg, args, logs, blueLogs){
    let channelType;
    let channelName;

    //Checks to see if there is a channelType arg
        if(!args[0]){
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Oops!") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("You need a channel type") //main text body
                    .setFooter(bhconfig.footer) //footer/watermark
                return msg.channel.send(embed);
            }
        } else{
            channelType = args.shift().toLowerCase();
        } 
        
        //checks for admin privs
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        } else if (channelType === 'text'){ //if channelType arg is text...
            if(args[1] == false){
                channelName = args;
            } else{
                channelName = args.join('-')
            }
             
            if (!channelName){
                if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                    let embed = new Discord.MessageEmbed() //sets send card message
                        .setAuthor("Oops!") // Header of card
                        .setColor("#486dAA") //Side bar color
                        .setDescription("Channel name is incorrect, please type a valid channel name!") //main text body
                        .setFooter(bhconfig.footer) //footer/watermark
                    return msg.channel.send(embed);
                }
            }
            msg.guild.channels.create(channelName, {
                type: channelType,
                permissionOverwrites: [
                    {
                        id: msg.guild.id,
                        allow: ['VIEW_CHANNEL'],
                    }]
                })
                if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                    let embed = new Discord.MessageEmbed() //sets send card message
                        .setAuthor("Channel Created") // Header of card
                        .setColor("#486dAA") //Side bar color
                        .setDescription(`Your channel **${channelName}** has been created`) //main text body
                        .setFooter(bhconfig.footer) //footer/watermark
                    return msg.channel.send(embed);
                }
        } else if(channelType === 'voice'){
            if(args[1] == false){
                channelName = args;
            } else{
                channelName = args.join(' ')
            }
            if(!channelName){
                if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                    let embed = new Discord.MessageEmbed() //sets send card message
                        .setAuthor("Oops!") // Header of card
                        .setColor("#486dAA") //Side bar color
                        .setDescription("Channel name is incorrect, please type a valid channel name!") //main text body
                        .setFooter(bhconfig.footer) //footer/watermark
                    return msg.channel.send(embed);
                }
            }
            msg.guild.channels.create(channelName, {
                type: channelType,
                permissionOverwrites: [
                    {
                        id: msg.guild.id,
                        allow: ['VIEW_CHANNEL'],
                    }]
                })
                if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                    let embed = new Discord.MessageEmbed() //sets send card message
                        .setAuthor("Channel Created") // Header of card
                        .setColor("#486dAA") //Side bar color
                        .setDescription(`Your channel **${channelName}** has been created`) //main text body
                        .setFooter(bhconfig.footer) //footer/watermark
                    msg.channel.send(embed);
                }
        } else {
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Uh Oh...") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription('We dont\'t know what went wrong...\n try checking your syntax: <!channel create> + <type> + <name>') //main text body
                    .setFooter(bhconfig.footer) //footer/watermark
                 return msg.channel.send(embed);
            }
        }

        if (logs === true) {
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Action | Channel Created") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`${channelName} was created by ${msg.author}`) //main text body
                .setFooter(bhconfig.footer) //footer/watermark
            return blueLogs.send(embed);
        } 
    }
}