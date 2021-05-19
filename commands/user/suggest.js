const suggestSchmea = require('../setup/schemas/suggest-schema')
const logSuggestionsSchema = require('../setup/schemas/log-suggestions-schema')
const mongo = require('../../mongo')
const Discord = require('discord.js') 

module.exports = {
    name: 'suggest',
    description: 'allows for users to make suggestions',

    async execute(client, msg, args){
        const suggestChannel = await mongo()
            .then(async mongoose => {
                try{
                    const result = await suggestSchmea.findOne({
                        _id: msg.guild.id
                    })

                    return result
                } catch (err){
                    console.error(`Error at suggest.js(18): ${err}`)
                }
            })

        if(!suggestChannel.cID){
            msg.reply(`The owner has not configured suggestions for this channel`)
        }

        const target = msg.guild.channels.cache.find(c => c.id === suggestChannel.cID)

        const text = args.join(' ')
        const code = random(6)
        let embed = new Discord.MessageEmbed()
            .setColor("#486dAA")
            .setDescription(`**Suggestion:** ${text}\n\n\
                                **Sent by:** <@${msg.author.id}>`)
            .setFooter(`sID: ${code} | uID: ${msg.author.id}`)
            .setThumbnail(msg.author.avatarURL())
        const newMessage = await target.send(embed)
        newMessage.react('✅')
        newMessage.react('❌')
        msg.delete();

        await mongo()
        .then(async mongoose => {
            try{
                new logSuggestionsSchema({
                    guild: msg.guild.id,
                    sID: code,
                    content: text,
                    mID: newMessage.id,
                    uID: msg.author.id
                }).save()
            } catch(err){
                console.error(`Error at suggest.js(43): ${err}`)
            }
        })
        return
    }
}

const random = (size) => {
    let generatedOutput= '';
    const storedCharacters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const totalCharacterSize = storedCharacters.length;
    for ( let index = 0; index < size; index++ ) {
       generatedOutput+=storedCharacters.charAt(Math.floor(Math.random() *
       totalCharacterSize));
    }
    return generatedOutput;
 }

 module.exports = {random};

