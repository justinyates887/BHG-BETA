const mongo = require('../mongo');
const profileSchema = require('../commands/setup/schemas/profile-schema')
const Discord = require('discord.js') 
const bhconfig = require('../commands/core/bhconfig.json')

module.exports = (client) => {

}

const getNeededXP = (level) => {level * level * 10}

const addXP = async (guildID, uID, xpToAdd, msg) => {
    await mongo()
    .then(async mongoose => {
        try{
            const result = await profileSchema.findOneAndUpdate({
                _id: guildID,
                uID
            }, {
                _id: guildID,
                uID,
                $inc: {
                    xp: xpToAdd
                }
            }, {
               upsert: true,
                new: true
            })

            if(result){
                let { xp, level } = result
                const needed = getNeededXP(level);
    
                if(xp > needed){
                    ++level;
                    xp -= needed;
    
                    if (bhconfig.embeds === true) {
                        let embed = new Discord.MessageEmbed()
                            .setAuthor("Congrats!")
                            .setColor("#486dAA")
                            .setDescription(`Congrats ${msg.user}, you are now level ${level}!`)
                            .setFooter(bhconfig.footer)
                        msg.channel.send(embed);
                    }
                        await profileSchema.updateOne({
                           _id: guildID,
                           uID 
                        }, {
                            xp,
                            level
                        })
                }
            } else {
                await new profileSchema({
                    _id: guildID,
                    uID,
                    coins,
                    xp,
                    level
                }).save()
            }

        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.addXP = addXP