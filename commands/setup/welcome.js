const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");
const mongo = require('../../mongo');
const welcomeSchema = require('./schemas/welcome-schema')

module.exports = {
    name: 'welcome',
    description: 'sets welcome custom welcome message for servers',

    async execute(client, msg, args, logs, blueLogs){
        const { member, channel, content, guild } = msg

        if (!member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        }

        let text = args.join(' ');

        if(!text){
            return channel.send('Please provide a welcome message');
        }

        await mongo().then(async (mongoose) => {
            try{
                 await welcomeSchema.findOneAndUpdate({
                     _id: guild.id
                 }, {
                    _id: guild.id,
                    channelId: channel.id,
                    text: text
                }, {
                   upsert: true 
                })
            } finally{
                mongoose.connection.close();
            }
        })
    }
}