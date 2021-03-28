const mongo = require('../../mongo');
const blacklistSchema = require('../setup/schemas/blacklist-schema');
const { getRoles } = require('./getRoles')

module.exports = {
    name: 'blacklist',
    description: 'add a list of words to blacklist',

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
                    } catch(err){
                         console.error(`Error at blacklist(43): ${err}`)
                    }

                    return msg.reply(`Blacklist updated`)

                } else if (msg.content.toUpperCase() === 'NO'){

                    let warn = false;

                    try{
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
                    } catch (err){
                        console.error(`Error at blacklist(67): ${err}`)
                    }

                    msg.reply(`Blacklist updated`)
                    return msg.delete();
                } else{
                    return msg.reply(`An error occured`)
                }
            }) 
        }
    }
}

module.exports.checkBlacklist = async (guildID, client, msg) => {

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
}