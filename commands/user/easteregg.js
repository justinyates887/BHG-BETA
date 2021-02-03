const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'easteregg',
    description: 'sends an easteregg',

    execute(client, msg, args, logs, blueLogs){
        msg.channel.send('https://www.edgenexus.io/wp-content/uploads/2018/03/Easteregg.png');
        return;
    }
}