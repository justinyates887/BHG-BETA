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
                                            > ${prefix}welcome (sets welcome channel for welcome cards)\n\
                                            > ${prefix}antiad (disallows any server invites unless they are from admin roles)`},
                    { name: `User Moderation`, value: `> ${prefix}ban (bans targeted user)\n\
                                                        > ${prefix}giverole (gives targeted role to targeted user (you don't have to @ the role, but it is CaSe sensitive))\n\
                                                        > ${prefix}kick (kicks targeted user)\n\
                                                        > ${prefix}mute (mutes user for spicified number of MINUTES)\n\
                                                        > ${prefix}removerole (removes targeted role from user)\n\
                                                        > ${prefix}warn (warns a user for reason specified)\n\
                                                        > ${prefix}warnlist (see a list of warnings issued)`},
                    { name: `Server Commands`, value: `> ${prefix}checklist (tells you what has been configured)\n\
                                                        > ${prefix}announce (sends an embedded announcment to a targeted channel)\n\
                                                        > ${prefix}channelcreate (creates a channel with the name you specify)\n\
                                                        > ${prefix}createrole (creates a role with the color and name you specify [color must be hex and  is optional])\n\
                                                        > ${prefix}deletechannel (deletes targeted channel)\n\
                                                        > ${prefix}deleterole (deletes targeted role)\n\
                                                        > ${prefix}leaderboard (tracks current invites created by user and how many times they've been used. deafult is top ten, but you can specify a number up to 25)\n\
                                                        > ${prefix}nuke (deletes all contents of channel and clones it)\n\
                                                        > ${prefix}purge (purges selected unmber of messages from channel)`},
                    { name: 'Ticket Commands', value: `> ${prefix}add (Adds a targeted user to the ticket)\n\
                                                        > ${prefix}close (closes the ticket)`},
                    { name: 'Suggestion Commands', value: `> ${prefix}approve (approves the selected sID, or suggestion ID and moves it to you specified approval channel)\n\
                                                        > ${prefix}delete (deletes a suggestion by sID) [${prefix}delete Tjma54]`},
                    { name: 'Economy', value: `> ${prefix}addbal (adds specified balance to user's economy profile within your server)\n\
                                                >${prefix}removebal (removes balance from a specified user)`},
                    { name: 'Server Wellbeing', value: `> ${prefix}deletedata (By default when you kick our bot form your server all of your data is automatically deleted.\
                                                                    if you, however, wish to manually do this, the deletedata command will wipe any and all saved data from our server.\n\n\
                                                                    **Note:** The only data we store is directly related to the bots functionality and your server's customization.)`}
                )
                .setTimestamp()
                .setFooter("Blue Haired Girl By SmallBlue Dev")
            msg.channel.send(embed);
        }
    }   
}