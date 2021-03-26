const { MessageReaction, User } = require('discord.js')
const reactionSchema = require('../commands/setup/schemas/reaction-schema')
/**
 * 
 * @param {MessageReaction} reaction 
 * @param {User} user 
 */

module.exports = async (client, reaction, user) => {
    let member = reaction.message.guild.members.cache.get(user.id)
    reactionSchema.findOne({
        _id: reaction.message.guild.id,
        mID: reaction.message.id,
        reaction: reaction.emoji.toString(),

    }, async(err, data) => {
        if(err) throw err;
        if(data){
            if(!member.roles.cache.has(data.role)){return};
        } else {
            member.roles.remove(data.role)
        }
    })
}