const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'npm',
    description: 'gives the true meaning of nmp',

    execute(client, msg, args, logs, blueLogs){
        let npmArr = [
            'Non Programming Manager',
            'Nine Pomeranian Monsters',
            'Node Package Master',
            'Nationwide Polamorous Matrimony',
            'New Public Media',
            'No Popular Movies',
            'Nocturnal Parakeet Monitor',
            'Nuclearly Potent Moonshine',
            'Nit Picky Manager',
            'Needlessly Provoking Marsupials',
            'Neurotic Pantaloon Maker',
            'Non Precious Metal',
            'Nipple Play Man'
        ]

        let random = Math.floor(Math.random() * Math.floor(npmArr.length));
        let npm = npmArr[random];

        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("NPM stands for...")
                .setColor("#486dAA")
                .setDescription(npm)
                .setFooter(bhconfig.footer)
            return msg.channel.send(embed);
        }
    }
}