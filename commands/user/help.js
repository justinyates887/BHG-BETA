const Discord = require("discord.js"); 
const bhconfig = require("../core/bhconfig.json"); 
const mongo = require('../../mongo')
const prefixSchema = require('../setup/schemas/command-prefix-schema')

module.exports = {
    name: 'help',
    description: 'this accesses the commands list',

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
                .setDescription(`Here's a few different help categories`)
                .setThumbnail(msg.guild.iconURL())
                .addFields(
                    { name: 'For server owners', value: `Use ${prefix}checklist to see how you are doing on configuration`},
                    { name: `\u200B`, value: `\u200B` },
                    { name: `Admin commands`, value: `${prefix}adminhelp` },
                    { name: `User commands`, value: `${prefix}userhelp` },
                    { name: `Server customization`, value: `${prefix}setuphelp or ${prefix}checklist`}
                )
                .setTimestamp()
                .setFooter("Blue Haired Girl By SmallBlue Dev")
            msg.channel.send(embed);
        }
    }
}