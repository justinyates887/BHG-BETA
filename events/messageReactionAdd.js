const { MessageReaction, User } = require('discord.js')
const reactionSchema = require('../commands/setup/schemas/reaction-schema')
/**
 * 
 * @param {MessageReaction} reaction 
 * @param {User} user 
 */

module.exports = async (client, reaction, user) => {
    reactionSchema.findOne({
        _id: reaction.message.guild.id,
        mID: reaction.message.id,
        reaction: reaction.emoji.toString(),

    }, async(err, data) => {
        if(err) throw err;
        if(data){
            if(reaction.message.member.roles.cache.has(data.role)){};
        } else {
            reaction.message.member.roles.add(data.role)
        }
    })
}