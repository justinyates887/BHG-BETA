const bhconfig = require("../core/bhconfig.json");
const Discord = require("discord.js");
const mongo = require('../../mongo');
const welcomeSchema = require('./schemas/welcome-schema')
const { getRoles } = require('./getRoles')

module.exports = {
    name: 'welcome',
    description: 'sets welcome custom welcome message for servers',

    async execute(client, msg, args){
        const { member, channel, content, guild } = msg

        const admin = await getRoles(msg.guild.id)
        const checkRoles = function(admin){
            if(admin && admin.admin){
                let result;
                for(let i = 0; i < admin.admin.length; i++){
                    const role =  msg.member.guild.roles.cache.find(r => r.id === admin.admin[i])
                    if(admin.admin[i] === role.id){
                        result = true
                    } else {
                        result = false
                    }
                }
                return result
            }
        }

        if(!msg.member.hasPermission('ADMINISTRATOR') && checkRoles(admin) === false){
            return msg.channel.send('Missing permissions');
        }

        if(msg.channel.mentions.first()){
            channel = msg.channel.mentions.first();
        }

        let burn = args.shift(msg.channel.mentions.first())
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
            } catch (err){
                console.error(`Error at db welcome.js(36)`)
            }
        })
    }
}