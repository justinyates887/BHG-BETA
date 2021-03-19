const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const Discord = require("discord.js");
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'giverole',
    description: 'gives role to specified user',

    async execute(client, msg, args){
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

        const { guild } = msg;
        let role;
        let roleName;
        let rMember = msg.mentions.users.first();
        let rMemberID = rMember.id;

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

        roleName = msg.mentions.roles.first();

        if (!roleName){
            if(args){
                let burn = args.shift();
                roleName = args.join(' ');
                console.log(roleName);
                roleName = guild.roles.cache.find((role) => {
                    return role.name === roleName;
                })
            } else {
                if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                    let embed = new Discord.MessageEmbed() //sets send card message
                        .setAuthor("Hmmmm...") // Header of card
                        .setColor("#486dAA") //Side bar color
                        .setDescription("Did you specify a role?") //main text body
                        .setFooter(bhconfig.footer) //footer/watermark
                    return msg.channel.send(embed);
                }
            }
        }

        let roleNameID = roleName.id;

        role = guild.roles.cache.find((role) => {
             return role.id === roleNameID;
         })

        const member = guild.members.cache.find((member) => {
            return member.id === rMemberID;
        });

        member.roles.add(role);

        if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Huzzah!") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`${member} now has the role ${role.name}.`) //main text body
                .setFooter(bhconfig.footer) //footer/watermark
             msg.channel.send(embed);
        } else {
           return msg.channel.send('The bot cannot give this role')
        }

        if (logs === true) {
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Action | Role Given") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription(`${member} was given role ${role} by ${msg.author}.`) //main text body
                .setFooter(bhconfig.footer) //footer/watermark
            return blueLogs.send(embed);
        } 
    }
}
//unfinished