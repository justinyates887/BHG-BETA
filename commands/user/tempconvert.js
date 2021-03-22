const bhconfig = require("../core/bhconfig.json");
const Discord = require("discord.js");

module.exports = {
    name: 'tempconvert',
    description: 'converts temperature given to F, C, or K',

    execute(client, msg){

        let filter = m => m.author.id === msg.author.id;

        if (bhconfig.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
            let embed = new Discord.MessageEmbed() //sets send card message
                .setAuthor("Boom") // Header of card
                .setColor("#486dAA") //Side bar color
                .setDescription("Please enter temperature to convert and its unit <ex. 32F>") //main text body
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

            let arg = msg.content.split('')
            let unit = arg.pop(arg.length - 1);
            let value = arg.join('');
            
            if (unit.toUpperCase() === 'F'){
                let celsiusConv = ((Number(value) - 32) * 5) / 9;
                let celRound = Math.round(celsiusConv);
                let kelvinConv = (Number(value) + 459.67) * 5 / 9;

                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(msg.content)
                        .setColor("#486dAA")
                        .setDescription(`${celRound}C\n${kelvinConv}K`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            } else if (unit.toUpperCase() === 'C'){
                let farConv = ((9 / 5) * Number(value)) + 32;
                let farRound = Math.round(farConv);
                let kelvinConv = Number(value) + 273.15;

                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(msg.content)
                        .setColor("#486dAA")
                        .setDescription(`${farRound}F\n${kelvinConv}K`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            } else if (unit.toUpperCase() === 'K'){
                let farConv = Number(value) * 9 / 5 - 459.67;
                let farRound = Math.round(farConv);
                let celsiusConv = Number(value) - 273.15;
                let celRound = Math.round(celsiusConv);

                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(msg.content)
                        .setColor("#486dAA")
                        .setDescription(`${farRound}F\n${celRound}C`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            } else {
                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor('Oops')
                        .setColor("#486dAA")
                        .setDescription(`Unexpected error`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            }
        });
    }
}