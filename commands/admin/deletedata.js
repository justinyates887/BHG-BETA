const { deleteAllData } = require('../../events/guildDelete')
const Discord = require('discord.js')
const bhconfig = require('../core/bhconfig.json')

module.exports = {
    name: 'deletedata',
    description: 'deletes all data from a guild',

    async execute(client, msg){

        if(!msg.member.hasPermission('ADMINISTRATOR') && checkRoles(admin) === false){
            return msg.channel.send('Missing permissions');
        } else {
            //ask if they're sure
            let filter = m => m.author.id === msg.author.id;

            if (bhconfig.embeds === true) { 
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Wait... where am I?") 
                    .setColor("#486dAA") 
                    .setDescription("Are you sure you want to do this?\n\n**THIS CAN'T BE UNDONE**\n**(YES/NO)**") 
                    .setFooter(bhconfig.footer) 
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

                    deleteAllData(msg.guild.id)

                    return msg.reply(`Data deleted`)

                } else if (msg.content.toUpperCase() === 'NO'){
                    if (bhconfig.embeds === true) {
                        let embed = new Discord.MessageEmbed() 
                            .setAuthor("Aborted") 
                            .setColor("#486dAA") 
                            .setDescription("Your data is safe!")
                            .setFooter(bhconfig.footer) 
                        return msg.channel.send(embed);
                    }
                } else{
                    if (bhconfig.embeds === true) { 
                        let embed = new Discord.MessageEmbed() 
                            .setAuthor("Nope") 
                            .setColor("#486dAA") 
                            .setDescription("Invalid respoonse.")
                            .setFooter(bhconfig.footer)
                        return msg.channel.send(embed);
                    }
                }
            }) 
        }
    }
}