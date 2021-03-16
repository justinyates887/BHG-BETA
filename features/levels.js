const mongo = require('../mongo');
const profileSchema = require('../commands/setup/schemas/profile-schema')
const Discord = require('discord.js') 
const bhconfig = require('../commands/core/bhconfig.json')

module.exports = (client) => {

}

const getNeededXP = (level) => {return level * level * 10}

const addXP = async (guildID, uID, xpToAdd, msg) => {
    await mongo()
    .then(async mongoose => {
        try{
            const result = await profileSchema.findOneAndUpdate({
                _id: uID,
                gID: guildID
            }, {
                _id: uID,
                gID: guildID,
                $inc: {
                    xp: xpToAdd
                },
            }, {
               upsert: true,
                new: true
            })

            if(!result){
                const result =  new profileSchema({
                    _id: uID,
                    gID: guildID,
                    coins,
                    xp: 1,
                    level
                })
            }

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
                            .setDescription(`Congrats <@${uID}>, you are now level ${level}!`)
                            .setFooter(bhconfig.footer)
                        msg.channel.send(embed);
                    }
                        await profileSchema.updateOne({
                           _id: uID,
                           gID: guildID 
                        }, {
                            xp,
                            level
                        })
                }
            } else {
                await new profileSchema({
                    _id: uID,
                    gID: guildID,
                    coins,
                    xp,
                    level
                }).save()
            }

        } catch (err){
            console.error(`Error at levels.js(feature)(65): ${err}`)
        }
    })
}

module.exports.addXP = addXP