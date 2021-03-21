const bhconfig =require('../core/bhconfig.json')
const Discord = require('discord.js')
const mongo = require('../../mongo')
const antiAdSchema = require('../setup/schemas/anti-ad-schema');
const blacklistSchema = require('../setup/schemas/blacklist-schema')
const commandPrefixSchema = require('../setup/schemas/command-prefix-schema')
const guildRolesSchema = require('../setup/schemas/guild-roles-schema')
const logsSchema = require('../setup/schemas/logs-schema')
const suggestSchema = require('./schemas/suggest-schema')
const ticketSchema = require('../setup/schemas/ticket-schema')
const welcomeSchema = require('../setup/schemas/welcome-schema');

module.exports = {
    name: 'checklist',
    description: 'tells a server owner what configurations they have or do not have',

    async execute (client, msg, args){
        let antiadResult;
        let blacklistResult;
        let prefixResult;
        let guildRolesResult = '';
        let logsResult;
        let suggestResult;
        let ticketsResult;
        let welcomeResult;

        await antiad(msg)
        .then((result) => {
            if(result.desired === true){
                antiadResult = `✅ Antiad has been configured`
            } else{
                antiadResult = `❌ Antiad not setup. Please use <prefix>antiad to set up if desired (blocks invites)`
            }
        })

        await blacklist(msg)
        .then(result => {
            if(result.words){
                blacklistResult = `✅ Blacklist has been configured`
            } else {
                blacklistResult = `❌ Blacklist not setup. Please use <prefix>blacklist + <words you want to blacklist> if desired. (blocks specific words)`
            }
        })

        await prefix(msg)
        .then(result => {
            if(result.prefix){
                prefixResult = `✅ Guild prefix has been configured`
            } else {
                prefixResult = `❌ Custom prefix not configured. For a custom prefix please use <b!setprefix> + <desired prefix>`
            }
        })

        await guildRoles(msg)
        .then(async result => {
            if(result){
                const guildR = await guildRoles(msg)
                if(guildR.admin && guildR.base && guildR.mute){
                    guildRolesResult += `✅ All guild roles configured`
                } else{
                    guildRolesResult += `❌ Not all guild roles configured.`
                    if(!guildR.admin){
                        guildRolesResult += `\n> ❌ **Admin:** has not been configured. Please use <prefix>setadminroles + admin roles if desired`
                    }
                    if(!guildR.base){
                        guildRolesResult += `\n> ❌ **Base Member:** has not been configured. Please use <prefix>setmemberrole + member role if desired`
                    }
                    if(!guildR.mute){
                        guildRolesResult += `\n> ❌ **Mute Role:** has not been configured. Please use <prefix>setmuterole + mute role if desired (required to use mute command)`
                    }
                }
            }
        })

        await logs(msg)
        .then(result => {
            if(result.cID){
                logsResult = `✅ Logs channel has been configured`
            } else {
                logsResult = `❌ Logs channel not configured. Please use <prefix>setlogschannel + <channel> if desired. (Required for logs)`
            }
        })

        await suggest(msg)
        .then(result => {
            if(result.cID && result.aCID){
                suggestResult = `✅ All suggest channel have been configured`
            } else {
                suggestResult = `❌ All suggest channels not configured. Please use <prefix>setlogschannel + <channel> if desired. (Required for logs)`
                if(!result.cID){
                    suggestResult += `\n> ❌ **Suggestions Channel:** Not configured. Use <prefix>setsuggestchannel + <targetchannel> (required for <prefix>suggest)`
                }
                if(!result.aCID){
                    suggestResult += `\n> ❌ **Approval Channel:** Not configured. Use <prefix>setapprovalchannel + <targetchannel> (required for <prefix>approve)`
                }
            }
        })

        await tickets(msg)
        .then(result => {
            if(result.cID){
                ticketsResult = `✅ Tickets category has been configured`
            } else {
                ticketsResult = `❌ Tickets category not set. Please use <prefix>setticketcategory + <ticket catgory ID> (required for tickets)`
            }
        })

        await welcome(msg)
        .then(result => {
            if(result.channelID){
                welcomeResult = `✅ Welcome channel has been set.`
            } else {
                welcomeResult = `❌ Welcome channel has not been configured. Please use <prefix>welcome + <target channel> if desired`
            }
        })

        if (bhconfig.embeds === true) {
            let embed = new Discord.MessageEmbed()
                .setAuthor("📝 Checklist")
                .setColor("#486dAA")
                .setDescription(`${antiadResult}\n\
                                ${blacklistResult}\n\
                                ${guildRolesResult}\n\
                                ${logsResult}\n\
                                ${suggestResult}\n\
                                ${ticketsResult}\n\
                                ${welcomeResult}`)
                .setFooter(bhconfig.footer)
            return msg.channel.send(embed);
        }
    }
}

const antiad = async (msg) => {
     return await mongo()
    .then(async mongoose => {
        try{
            const result = antiAdSchema.findOne({
                _id: msg.guild.id
            })
            return result
        } catch (err){
            return console.error(err)
        }
    })
}

const blacklist = async (msg) => {
     return await mongo()
    .then(async mongoose => {
        try{
            const result = blacklistSchema.findOne({
                _id: msg.guild.id
            })
            return result
        } catch (err){
            return console.error(err)
        }
    })
}

const prefix = async (msg) => {
     return await mongo()
    .then(async mongoose => {
        try{
            const result = commandPrefixSchema.findOne({
                _id: msg.guild.id
            })
            return result
        } catch (err){
            return console.error(err)
        }
    })
}

const guildRoles = async (msg) => {
     return await mongo()
    .then(async mongoose => {
        try{
            const result = guildRolesSchema.findOne({
                _id: msg.guild.id
            })
            return result;
        } catch (err){
            return console.error(err)
        }
    })
}

const logs = async (msg) => {
     return await mongo()
    .then(async mongoose => {
        try{
            const result = logsSchema.findOne({
                _id: msg.guild.id
            })
            return result
        } catch (err){
            return console.error(err)
        }
    })
}

const suggest = async (msg) => {
    return await mongo()
   .then(async mongoose => {
       try{
           const result = suggestSchema.findOne({
               _id: msg.guild.id
           })
           return result
       } catch (err){
           return console.error(err)
       }
   })
}

const tickets = async (msg) => {
     return await mongo()
    .then(async mongoose => {
        try{
            const result = ticketSchema.findOne({
                _id: msg.guild.id
            })
            return result
        } catch (err){
            return console.error(err)
        }
    })
}

const welcome = async (msg) => {
     return await mongo()
    .then(async mongoose => {
        try{
            const result = welcomeSchema.findOne({
                _id: msg.guild.id
            })
            return result
        } catch (err){
            return console.error(err)
        }
    })
}