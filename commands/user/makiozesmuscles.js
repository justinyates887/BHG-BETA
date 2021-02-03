const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'makiozesmuscles',
    description: 'no desc needed',

    execute(client, msg, args, logs, blueLogs){
        msg.channel.send('https://64.media.tumblr.com/6bb2ef29ff60f37469b90c653ee4c4b4/tumblr_pujoh77U311ud6dexo2_1280.jpg');
        return;
    }
}