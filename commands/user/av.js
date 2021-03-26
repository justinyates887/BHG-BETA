const Discord = require("discord.js");

module.exports = {
    name: 'av',
    description: 'allows for other users to see a user\'s avatar',

    execute(client, msg, args){
        const member = msg.mentions.users.first() || msg.author;

        if(!member || member === null){
           return  msg.reply(`Please spcify a valid member`)
        }

        let embed = new Discord.MessageEmbed()
        .setAuthor(member.username)
        .setColor("#486dAA")
        .setImage(member.avatarURL({
            format: 'png'
        }))
        

        return msg.channel.send(embed)
    }
}