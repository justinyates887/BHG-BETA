const bhconfig = require("../core/bhconfig.json");  //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client();


module.exports = {
    name: 'ban',
    description: "This ban\'s player!",

    async execute(client, msg, args, logs, blueLogs) {
        const target = msg.mentions.users.first()  // The target that we are trying to ban
        var banReason; // Reason of the ban
        const bot = "794674548875460649"//bot uID
    
    if(msg.member.roles.cache.has(bhconfig.adminRole)){
     // Allows only members with the admin role to kick players
            banReason = args.slice(1).join(" "); // Reason of the ban (Everything behind the mention)
        if (!target) { // Does this if the target did not tag a member
            if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Error!") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("No target found please @ the target your trying to ban") //main text body
                    .setFooter(embeds) //footer/watermark
                return msg.channel.send(embed);
        }
    }
    if (!banReason) {
        // Sets the Var reason to this:
        banReason = "No reason provided";
    }
    // Checks if the person trying to ban is the bot
            // If so it does this:
    if (target.id === bot) {
        //Checks if the embed option is true
        if (bhconfig.embeds === true) {
             // Creates and sends this embed
             let embed = new Discord.MessageEmbed()
                .setAuthor("Nice try!")
                .setColor("#486dAA")
                .setDescription("Why would you try this? Trying to ban me through my own command!")
                .setFooter(embeds)
                return msg.channel.send(embed)
        } else {
            //Sends this if the embed option is false
            return msg.channel.send("No, just No.");
        }
    }
            // Checks if the user is banning themself 
            // If so it does this:
    var embeds;
    if (bhconfig.override === true) {
        embeds = bhconfig.footer; // Checks to see if the overide is true in the bhconfig
    }
    if (target.id === msg.author.id){  // checks to see if the target is the msg author 
        if (bhconfig.embeds === true) { //Checks if the embed option is true
            // Creates and sends this embed
            let embed = new Discord.MessageEmbed()
                .setAuthor("Error!")
                .setColor("#486dAA")
                .setDescription("You cannot ban yourself")
                .setFooter(embeds)
            return msg.channel.send(embed);
        } else {
            //Sends this if the embed option is false
            return msg.channel.send("You cannot ban yourself.");
        }
    }
            // Checks if the person tagged is null
            // If so send this:
    if (target == null) {
        let embed = new Discord.MessageEmbed()
                .setAuthor("Error!")
                .setColor("#486dAA")
                .setDescription("Player does not exist")
                .setFooter(embeds)
            return msg.channel.send(embed);
    }
    // If all checks have been passed as OK
    // it will then ban the user
    if(target){
        const memberTarget = msg.guild.members.cache.get(target.id);
        memberTarget.ban({
        });
    }else{
        msg.channel.send(`Could not ban member`);
    }
        var embeds1;
        if (bhconfig.override === true) {
            embeds1 = bhconfig.footer;
        }
        console.log(args);
        // Then it will send this embed to say
        // that the user has been banned
        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("Banned")
                .setColor("#486dAA")
                .setDescription(bhconfig.userBanned
                    .replace(/{user}/g, target)
                    .replace(/{userID}/g, target.id)
                    .replace(/{staffMember}/g, msg.author)
                    .replace(/{reason}/g, banReason))
                .setFooter(embeds1);
            msg.channel.send(embed);
        } else {
            msg.channel.send(bhconfig.userBanned
                .replace(/{user}/g, target)
                .replace(/{userID}/g, target.id)
                .replace(/{staffMember}/g, msg.author)
                .replace(/{reason}/g, banReason));
        }

        // Logs
        if (logs === true) {
            let banEmbed = new Discord.MessageEmbed()
                .setAuthor("Action | User banned")
                .setColor("#486dAA")
                .setDescription(bhconfig.userBanned
                    .replace(/{user}/g, target)
                    .replace(/{userID}/g, target.id)
                    .replace(/{staffMember}/g, msg.author)
                    .replace(/{reason}/g, banReason))
                .setFooter(bhconfig.footer);
            blueLogs.send(banEmbed);
        } 
    } else {
        msg.channel.send('You do not have the permissions to ban a member')
    }
}
}
/*
-needs perms
-needs reason
-needs PM
-
*/