const mongo = require('../mongo')
const antiAdSchema = require('../commands/setup/schemas/anti-ad-schema')
const blacklistSchema = require('../commands/setup/schemas/blacklist-schema')
const commandPrefixSchema = require('../commands/setup/schemas/command-prefix-schema')
const guildRolesSchema = require('../commands/setup/schemas/guild-roles-schema')
const suggestionSchema = require('../commands/setup/schemas/suggest-schema')
const logsSuggestionSchema = require('../commands/setup/schemas/log-suggestions-schema')
const logsSchema = require('../commands/setup/schemas/logs-schema')
const messageSchema = require('../commands/setup/schemas/message')
const profileSchema = require('../commands/setup/schemas/profile-schema')
const serverStatsSchema = require('../commands/setup/schemas/server-stats-schema')
const warnSchema = require('../commands/setup/schemas/warn-schema')
const welcomeSchema = require('../commands/setup/schemas/welcome-schema')


module.exports = async (client, guild) => {
    const guildID = guild.id

    deleteAllData(guildID)
}

//this function will delete all guild data on guild remove
const deleteAllData = async (guildID) => {
    return await mongo()
    .then(async mongoose => {
        try{
            await antiAdSchema.findOneAndDelete({ _id: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (antiad): ${err}`)
        } 
    }) .then(async mongoose => {
        try{
            await blacklistSchema.findOneAndDelete({ _id: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (blacklist): ${err}`)
        } 
    }) .then(async mongoose => {
        try{
            await commandPrefixSchema.findOneAndDelete({ _id: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (commandprefix): ${err}`)
        } 
    }) .then(async mongoose => {
        try{
            await guildRolesSchema.findOneAndDelete({ _id: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (guildroles): ${err}`)
        } 
    })  .then(async mongoose => {
        try{
            await suggestionSchema.findOneAndDelete({ _id: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (antiad): ${err}`)
        } 
    })  .then(async mongoose => {
        try{
            await logsSuggestionSchema.findOneAndDelete({ guild: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (antiad): ${err}`)
        } 
    })  .then(async mongoose => {
        try{
            await logsSchema.findOneAndDelete({ _id: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (antiad): ${err}`)
        } 
    }) .then(async mongoose => {
        try{
            await messageSchema.findOneAndDelete({ _id: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (message): ${err}`)
        } 
    }) .then(async mongoose => {
        try{
            await profileSchema.deleteMany({ gID: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (profiles): ${err}`)
        } 
    })  .then(async mongoose => {
        try{
            await serverStatsSchema.findOneAndDelete({ _id: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (antiad): ${err}`)
        } 
    }) .then(async mongoose => {
        try{
            await warnSchema.deleteMany({ gID: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (warn): ${err}`)
        } 
    }) .then(async mongoose => {
        try{
            await welcomeSchema.findOneAndDelete({ _id: guildID })
        }catch(err){
            console.error(`Error at guildDelete database removal (welcome): ${err}`)
        } 
    })
}

module.exports.deleteAllData = deleteAllData