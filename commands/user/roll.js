const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'roll',
    description: 'rolls a set of dice',

    execute(client, msg, args, logs, blueLogs){
        let x = msg.content.split(' ').slice(1);
        let store = x.toString().split('d').join(',').split('+').join(',').split(',');
        msg.delete();

        //checks for spaces or empty values
        if(store[0] == ''){
            store[0] = 1;
        }

        let diceTotal = 0;
        let diceRoll;
        let total;
        let n;
        let multRolls = [];

        //checks if args is empty
        if(!args){
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Critical Fail")
                    .setColor("#486dAA")
                    .setDescription("I need more info to roll, check your formatting.")
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        }

        //standard dice roll
        if(!store[1]){

            if(isNaN(store[0])){
                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Hmmm...")
                        .setColor("#486dAA")
                        .setDescription(`${msg.author}, check your formatting, **${store[0]}** is not a number.`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            }

            diceRoll = Math.floor(Math.random() * store[0]) + 1;
            diceTotal = diceRoll;

            if(diceTotal == 1){
                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Critical Fail...")
                        .setColor("#486dAA")
                        .setDescription(`${msg.author}, you rolled a **${diceTotal}**`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            } else if (diceTotal == 20){
                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("CRITICAL HIT")
                        .setColor("#486dAA")
                        .setDescription(`${msg.author}, you rolled a **${diceTotal}**`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            } else {
                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setColor("#486dAA")
                        .setDescription(`${msg.author}, you rolled a **${diceTotal}**`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            }
        }

        //nan check
        if (isNaN(store[0])) {
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Hmmm...")
                    .setColor("#486dAA")
                    .setDescription(`${msg.author}, check your formatting, **${store[0]}** is not a number.`)
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        }

        //nan check
        if (isNaN(store[1])) {
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Hmmm...")
                    .setColor("#486dAA")
                    .setDescription(`${msg.author}, check your formatting, **${store[1]}** is not a number.`)
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        }

        //if there is no modifier (ex. +2)
        if (!store[2]) {
            if (store[0] > 20) {
                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Bruh")
                        .setColor("#486dAA")
                        .setDescription(`${msg.author}, you don't need to roll **${store[0]}** dice. That's too much.`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            }
            if (store[1] > 100) {
                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Bruh")
                        .setColor("#486dAA")
                        .setDescription(`${msg.author}, you don't need to roll a **${store[1]}** sided dice. That's a sphere.`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            }

            for(n = 1; n <= store[0]; n++){
                diceRoll = Math.floor(Math.random() * store[1]) +1;
                diceTotal = diceTotal + diceRoll;
                multRolls.push(diceRoll);
            }

            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setColor("#486dAA")
                    .setDescription(`${msg.author}, you rolled a **${diceTotal}**\nHere were your rolls: *${multRolls}*`)
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        } else if (isNaN(store[2])){
            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Hmmm...")
                    .setColor("#486dAA")
                    .setDescription(`${msg.author}, check your formatting, **${store[2]}** is not a number.`)
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        } else {
            if (store[0] > 20) {
                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Bruh")
                        .setColor("#486dAA")
                        .setDescription(`${msg.author}, you don't need to roll **${store[0]}** dice. That's too much.`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            }
            if (store[1] > 100) {
                if (bhconfig.embeds === true) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor("Bruh")
                        .setColor("#486dAA")
                        .setDescription(`${msg.author}, you don't need to roll a **${store[1]}** sided dice. That's a sphere.`)
                        .setFooter(bhconfig.footer)
                    return msg.channel.send(embed);
                }
            }

            for(n = 1; n <= store[0]; n++){
                diceRoll = Math.floor(Math.random() * store[1]) + 1;
                diceTotal = diceTotal + diceRoll;
                multRolls.push(diceRoll);
            }

            total = diceTotal + Number((store[2]));

            if (bhconfig.embeds === true) {
                let embed = new Discord.MessageEmbed()
                    .setColor("#486dAA")
                    .setDescription(`${msg.author}, you rolled a **${total}**\nHere were your rolls: *${multRolls}* + ${store[2]}`)
                    .setFooter(bhconfig.footer)
                return msg.channel.send(embed);
            }
        }









    }
}