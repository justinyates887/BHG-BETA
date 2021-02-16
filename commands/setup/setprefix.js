const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");
const mongo = require('../../mongo');
const commandPrefixSchema = require('./schemas/command-prefix-schema')

module.exports = {
    name: 'setprefix',
    description: 'sets custom prefix for the server',

    async execute(client, msg, args, logs, blueLogs){

        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        }

        await mongo().then(async mongoose => {
            try{
                const guildId = msg.guild.id;

                await commandPrefixSchema.findOneAndUpdate(
                    {
                        _id: guildId
                    },
                    {
                        _id: guildId,
                        prefix: args[0]
                    },
                    {
                        upsert: true
                    })

                    msg.reply(`The prefix for this server is now ${args[0]}`)
            }finally{
                mongoose.connection.close();
            }
        })

    }
}