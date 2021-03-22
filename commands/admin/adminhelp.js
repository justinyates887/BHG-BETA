const bhconfig = require("../core/bhconfig.json");  //initialize bhconfig.json
const Discord = require("discord.js");
const mongo = require('../../mongo');
const prefixSchema = require('../setup/schemas/command-prefix-schema')

module.exports = {
    name: 'adminhelp',
    description: 'gives admin help',

    async execute(client, msg, args){
        const prefix = await mongo()
        .then(async mongoose => {
            try{
                const result = await prefixSchema.findOne({
                    _id: msg.guild.id
                })
                return result.prefix
            } catch(err) {
                return
            }
        }) || 'b!'

        if(bhconfig.embeds === true){
            let embed = new Discord.MessageEmbed()
                .setAuthor("The Blue Haired Girl", 'https://i.imgur.com/RhSdj8j.png')
                .setTitle('Join The Discord')
                .setURL('https://discord.gg/FqbRWkgfcT')
                .setColor("#486dAA")
                .setDescription(`A list of admin only commands`)
                .setThumbnail(msg.guild.iconURL())
                .addFields(
                    { name: 'Note', value: `Use ${prefix}checklist to see how you are doing on configuration\n\
                                            Until you configure ${prefix}setadminroles only roles with ADMINISTRATOR permission will be able to use these commands.`},
                    { name: `\u200B`, value: `\u200B` },
                    { name: `Setup`, value: `> ${prefix}blacklist (allows you to blacklist words)\n\
                                            > ${prefix}serverstats (adds server stat channels)\n\
                                            > ${prefix}setadminroles (allows you to add admin roles you wish to use admin commands)\n\
                                            > ${prefix}setapprovalchannel (sets channel where approved suggestions will go)\n\
                                            > ${prefix}setsuggestchannel (sets channel where users can send an embedded suggestion)\n\
                                            > ${prefix}setlogschannel (sets channel where action logs will be sent)`},
                    {name: 'Setup cont...', value: `> ${prefix}setmemberrole (sets base member role, required for captcha verification ${prefix}verify)\n\
                                            > ${prefix}setmuterole (sets mute role for your server, required to use ${prefix}mute)\n\
                                            > ${prefix}setprefix (sets custom prefix for your server)\n\
                                            > ${prefix}setticketcategory (sets category where tickets will go, required for tickets)\n\
                                            > ${prefix}welcome (sets welcome channel for welcome cards)`},
                    { name: `User Moderation`, value: `> ${prefix}ban (bans targeted user)\n\
                                                        > ${prefix}giverole (gives targeted role to targeted user (you don't have to @ the role, but it is CaSe sensitive))\n\
                                                        > ${prefix}kick (kicks targeted user)\n\
                                                        > ${prefix}mute (mutes user for spicified number of MINUTES)\n\
                                                        > ${prefix}removerole (removes targeted role from user)\n\
                                                        > ${prefix}warn (warns a user for reason specified)\n\
                                                        > ${prefix}warnlist (see a list of warnings issued)`},
                    { name: `Server Comamnds`, value: `${prefix}setuphelp or ${prefix}checklist`}
                )
                .setTimestamp()
                .setFooter("Blue Haired Girl By SmallBlue Dev")
            msg.channel.send(embed);
        }
    }   
}