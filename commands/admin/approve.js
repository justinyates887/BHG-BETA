const mongo = require('../../mongo')
const suggestSchema = require('../setup/schemas/suggest-schema')
const logSuggestionsSchema = require('../setup/schemas/log-suggestions-schema')
const { getRoles } = require('../setup/getRoles')
const Discord = require("discord.js");

module.exports = {
    name: 'approve',
    description: 'approves a suggestion and moves it to specified channel',

    async execute(client, msg, args){
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

        const sID = args[0]
        if(!sID){
            return msg.reply(`Please specify a sID`)
        }
        let result;
        try{
            const data = await logSuggestionsSchema.findOne({
                guild: msg.guild.id,
                sID: sID
            })
            result = data
        } catch{
            return console.error(`Error: ${err}`)
        }

        if(!result){
            msg.reply(`I couldn't find a suggestion under that ID`)
        }

        let approvalChannel;
        try{
            const channel = await suggestSchema.findOne({
                _id: msg.guild.id
            })
            approvalChannel = channel
        } catch(err){
            return console.error(err)
        }

        if(!approvalChannel){
            msg.reply(`I could find any channels for suggestions. have you set them up?`)
        }

        const approvalTarget =  msg.guild.channels.cache.find(c => c.id === approvalChannel.aCID)
        if(!approvalTarget){
            return msg.reply(`I couldn't find a valid apporoval channel`)
        }
        const suggestChannel = msg.guild.channels.cache.find(c => c.id === approvalChannel.cID)
        const oldSuggestion = await suggestChannel.messages.fetch(result.mID)
        const likes = oldSuggestion.reactions.cache.get('✅')
        const dislikes = oldSuggestion.reactions.cache.get('❌')

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.guild.name}`, msg.guild.iconURL())
        .setColor("#00FF00")
        .setDescription(`**Results:**\n✅: ${likes.count}\n❌: ${dislikes.count}\n\n\
                        **Suggestion:** ${result.content}\n\n\
                        **Submitted by:** <@${result.uID}>\n\n\
                        **Approved by:** <@${msg.author.id}>`)
        .setFooter(`sID: ${result.sID}`)

        approvalTarget.send(embed)

        try{
            await logSuggestionsSchema.findOneAndDelete({
                sID: sID
            })
        } catch(err){
            return console.error(err)
        }

        msg.delete();
        return oldSuggestion.delete()
    }
}