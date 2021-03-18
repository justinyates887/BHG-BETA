const mongo = require('../../mongo');
const blacklistSchema = require('../setup/schemas/blacklist-schema');

module.exports = {
    name: 'blacklist',
    description: 'add a list of words to blacklist',

    async execute(client, msg, args){
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            msg.channel.send('missing permissions')
        } else {
            //ask if they're sure
            let filter = m => m.author.id === msg.author.id;

            msg.reply('Would you like to warn users(YES) or just delete the message(NO)')

            msg.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            .then(async msg => {
                msg = msg.first();
                if(msg.content.toUpperCase() === 'YES') {    

                    let warn = true;

                    try{
                        await mongo()
                        .then(async mongoose => {
                            await blacklistSchema.findOneAndUpdate({
                                _id: msg.guild.id
                            },{
                                $push: {
                                    words: args
                                },
                                warns: warn
                            }, {
                                upsert: true
                            })
                        })
                    } catch(err){
                         console.error(`Error at blacklist(43): ${err}`)
                    }

                    return msg.reply(`Blacklist updated`)

                } else if (msg.content.toUpperCase() === 'NO'){

                    let warn = false;

                    try{
                        await mongo()
                        .then(async mongoose => {
                            await blacklistSchema.findOneAndUpdate({
                                _id: msg.guild.id
                            },{
                                $push: {
                                    args
                                },
                                warns: warn
                            }, {
                                upsert: true
                            })
                        })
                    } catch (err){
                        console.error(`Error at blacklist(67): ${err}`)
                    }

                    msg.reply(`Blacklist updated`)
                    return msg.delete();
                } else{
                    msg.reply(`An error occured`)
                }
            }) 
        }
    }
}

module.exports.checkBlacklist = async (guildID, client, msg) => {
    await mongo()
    .then(async mongoose => {
        for(const guild of client.guilds.cache){
            const result = await blacklistSchema.findOne({ _id: guildID })
            if(result){
                for(let i = 0; i < result.words.length; i++){
                    if(msg.content.includes(`${result.words[i]}`)){
                        msg.delete();
                        if(result.warns === true){
                            return msg.reply(`That word is not allowed in this server!`)
                        } else {
                            return
                        }
                    }
                }
            } else {
                return
            }
        }
    })
}