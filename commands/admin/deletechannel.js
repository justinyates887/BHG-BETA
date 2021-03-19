const bhconfig = require("../core/bhconfig.json");  //initialize bhconfig.json
const Discord = require("discord.js");
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'deletechannel',
    description: 'deletes the channel specified by the user',

    async execute(client, msg, args, logs, blueLogs){

        
        let targetChannel = msg.mentions.channels.first();
        let targetChannelID = targetChannel.id;

        const { guild } = msg;

        const target = guild.channels.cache.find((target) => {
            return target.id === targetChannelID;
        });

        if(!target){
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Hmmm...") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("Please specify a channel") //main text body
                    .setFooter(bhconfig.footer) //footer/watermark
                 return msg.channel.send(embed);
            }
        }
        
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
        } else{
            //ask if they're sure
            let filter = m => m.author.id === msg.author.id;

            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Bye-bye") // Header of card
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
                    target.delete();
                } else if (msg.content.toUpperCase() === 'NO'){
                    if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                        let embed = new Discord.MessageEmbed() //sets send card message
                            .setAuthor("Aborted") // Header of card
                            .setColor("#486dAA") //Side bar color
                            .setDescription("This cahnnel is safe... for now.") //main text body
                            .setFooter(bhconfig.footer) //footer/watermark
                         return msg.channel.send(embed);
                    }
                }
            })  
        }

        if (logs === true) {
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Action | Channel Deleted") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`${target} was deleted by ${msg.author}.`) //main text body
                .setFooter(bhconfig.footer) //footer/watermark
            return blueLogs.send(embed);
        } 
    }
}
