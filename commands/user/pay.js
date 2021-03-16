const economy = require('../../features/economy')
const bhconfig = require('../core/bhconfig.json')
const Discord = require('discord.js') 

module.exports = {
    name: 'pay',
    description: 'allows users to transfer coins to and form one another',

    async execute(client, msg, args){
        const { guild, member } = msg;
        const target = msg.mentions.users.first();

        if(!target){
            return msg.reply('You need to specify a valid user')
        }

        const coinsToGive = args[1];

        if(isNaN(coinsToGive)){
            return msg.reply('You need to specify a valid number of coins!')
        }

        const coinsOwned = await economy.getCoins(guild.id, member.id)

        if(coinsOwned < coinsToGive){
            return msg.reply(`You do not have ${coinsToGive} coins! **Current Balance:** ${coinsOwned}`)
        }

        const coinsToTake = coinsToGive * - 1

        const remainingCoins = await economy.addCoins(
            guild.id,
            member.id,
            coinsToTake
        )

        const newBalance = await economy.addCoins(
            guild.id,
            target.id,
            coinsToGive
        )

        const whyDoIHaveToDoThis = await economy.getCoins(guild.id, member.id)
        const whyDoIHaveToDoThisTwo = await economy.getCoins(guild.id, target.id)

        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("Cha-ching")
                .setColor("#486dAA")
                .setDescription(`<@${member.id}> you have given <@${target.id}> **${coinsToGive} coins.**\
                                 You now have *${whyDoIHaveToDoThis}* coins and they now have *${whyDoIHaveToDoThisTwo}* coins`)
                .setFooter(bhconfig.footer)
            return msg.channel.send(embed);
        }
    }
}