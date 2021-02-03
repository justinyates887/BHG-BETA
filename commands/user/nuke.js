const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'nuke',
    description: 'this will delete a channel and create an identical one',

    async execute(client, msg, args, logs, blueLogs){
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            msg.channel.send('missing permissions')
        } else {
            //ask if they're sure
            let filter = m => m.author.id === msg.author.id;

            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Boom") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("Are you sure you want to do this?\n\n**THIS CAN'T BE UNDONE**\n**(YES/NO)**") //main text body
                    .setFooter(bhconfig.footer) //footer/watermark
                    msg.channel.send(embed);
            }

            msg.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            .then(msg => {
                msg = msg.first();
                if(msg.content.toUpperCase() === 'YES') {    
                    msg.channel.clone().then(channel2 => {
                        channel2.setPosition(msg.channel.position);
                    })

                    if (logs === true) {
                        let embed = new Discord.MessageEmbed() //sets send card message
                            .setAuthor("Action | Channel Nuked") // Header of card
                            .setColor("#486dAA") //Side bar color
                            .setDescription(`A channel was nuked by ${msg.author}`) //main text body
                            .setFooter(bhconfig.footer) //footer/watermark
                        blueLogs.send(embed);
                    } 

                    msg.channel.delete();


                } else if (msg.content.toUpperCase() === 'NO'){
                    if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                        let embed = new Discord.MessageEmbed() //sets send card message
                            .setAuthor("Aborted") // Header of card
                            .setColor("#486dAA") //Side bar color
                            .setDescription("World peace has been achieved") //main text body
                            .setFooter(bhconfig.footer) //footer/watermark
                        return msg.channel.send(embed);
                    }
                } else{
                    if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                        let embed = new Discord.MessageEmbed() //sets send card message
                            .setAuthor("Nope") // Header of card
                            .setColor("#486dAA") //Side bar color
                            .setDescription("Invalid respoonse.") //main text body
                            .setFooter(bhconfig.footer) //footer/watermark
                        return msg.channel.send(embed);
                    }
                }
            }) 
        }
    }
}
//needs to be able to nuke channels with perms