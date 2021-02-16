const bhconfig = require("../core/bhconfig.json");  //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'adminhelp',
    description: 'gives admin help',

    execute(client, msg, args){
        if(bhconfig.embeds === true){
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Admin Commands") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`- **${bhconfig.prefix}help** gives list of commands\n\
                - **${bhconfig.prefix}kick** kicks selected user *[${bhconfig.prefix}<command> + <@user> + <reason (if any)>]*\n\
                - **${bhconfig.prefix}ban** bans selected user *[${bhconfig.prefix}<command> + <@user> + <reason (if any)>]*\n\
                - **${bhconfig.prefix}warn** warns selected user *[${bhconfig.prefix}<command> + <@user>]*\n\
                - **${bhconfig.prefix}purge** purges messages *[${bhconfig.prefix}<command> + <quantity to delete>]*\n\
                - **${bhconfig.prefix}nuke** deletes the channel and creates a replica **(this cannot be undone)**\n\
                - **${bhconfig.prefix}channelcreate** creates a channel *[${bhconfig.prefix}<command> + <channel type (voice/text)> + <channel name>]*\n\
                - **${bhconfig.prefix}channeldelete** deletes channel command is ran in`)
                .setFooter(bhconfig.footer) //footer/watermark
            msg.channel.send(embed);
        }
    if(bhconfig.embeds === true){
        let embed = new Discord.MessageEmbed()
            .setAuthor("Admin Commands Page 2")
            .setColor(`#486dAA`)
            .setDescription(`- **${bhconfig.prefix}invitebot** send a bot invite link *[${bhconfig.prefix}<command>]*\n\
            - **${bhconfig.prefix}invitelink** send a link to the SmallBlue discord *[${bhconfig.prefix}<command>]*\n\
            - **${bhconfig.prefix}devlopers** shows you the sexy people who created this bot *[${bhconfig.prefix}<command>]*\n\
            - **${bhconfig.prefix}donate** If you would like to support us *[${bhconfig.prefix}<command>]*\n\
            - **${bhconfig.prefix}giverole** Gives you the stated role *[${bhconfig.prefix}<command> + <@user> + <role name>]*\n\
            - **${bhconfig.prefix}removerole** Removes the stated role *[${bhconfig.prefix}<command> + <@user> + <role name>]*\n\
            - **${bhconfig.prefix}addlogchannel** create a channel called blue-logs and enables logging from the bot on certain events\n\
            - **${bhconfig.prefix}announce** gives an @everyone announcement in target channel [${bhconfig.prefix}<command> + <target-channel> + <message>]\n\
            - **${bhconfig.prefix}createrole** creates a role [${bhconfig.prefix}<command> + <color (put any letter in here for default)> + <role name>]\n\
            - **${bhconfig.prefix}deleterole** deletes the specified role\n\
            - **${bhconfig.prefix}startgiveaway** starts a giveaway on the last message\n\
            - **${bhconfig.prefix}endgiveaway** ends a giveaway on the last message (note there must be no new messages in between the start and end)\n\
            - **${bhconfig.prefix}ticket** creates an open ticket channel and sends ticket to this channel (this is kept in admin commands to prevent spamming)`)
            .setFooter(bhconfig.footer) 
        msg.channel.send(embed);
        }
    }   
}