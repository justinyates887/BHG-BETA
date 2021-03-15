const mongo = require('../mongo');
const Discord = require('discord.js')    
const client = new Discord.Client()   
const msgCountSchema = require('../commands/setup/schemas/msg-count-schema');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5NDY3NDU0ODg3NTQ2MDY0OSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjExMTY0MDM5fQ._xTPzCfejiQuftOibOgMgw1gjXap0-2qZHWkAG4iVhA', client);
const { isInvite } = require('../commands/admin/antiad');
const antiAdSchema = require('../commands/setup/schemas/anti-ad-schema');
const { addXP } = require('../features/levels');


module.exports = async (client, msg) => {
    if (msg.author.bot || msg.channel.type === 'dm') return;

    await mongo().then(async mongoose => {
        try{
            await msgCountSchema.findOneAndUpdate(
            {
                _id: msg.author.id
            },
            {
               gID: msg.guild.id,
                $inc: {
                    'msgCount': 1
                }, 
            },
            {
                upsert: true
            }).exec()
        } catch(err){
            console.log(err);
        }finally{
            mongoose.connection.close();
        }
    })

    //checks blue haired server for voters on top.gg
    if(msg.guild.id === '795324515034726410'){
        let user = msg.author.id;
        let role = msg.guild.roles.cache.find((role) => {
            return role.id == '801158747070136330';
        })
        const member = msg.guild.members.cache.find((member) => {
            return member.id === msg.author.id;
        });
        dbl.hasVoted(user).then(voted => {
            if (voted) member.roles.add(role);
        });
    }

    //checks if message is discor dinvite link
    if(msg.content.includes('discord.gg/')){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            return
        }
        const code = msg.content.split('discord.gg/')[1]
        const guild = msg.guild
        const isOurInvite = await isInvite(guild, code)
        if(isOurInvite === false){
            await mongo()
            .then(async mongoose => {
                try{
                    for(const guild of client.guilds.cache){
                        const result = await antiAdSchema.findOne({ _id: msg.guild.id})
                        console.log(result)
                        if(result && result.desired === true){
                            console.log(msg);
                            msg.delete();
                            return msg.channel.send('Advertisments are not allowed.')
                        } else {
                            return
                        }
                    }
                } catch (err) {
                    console.log(err)
                    return
                } finally {
                    mongoose.connection.close();
                }
            })
        }
    }

    //adds xp to user
    addXP(msg.guild.id, msg.member.id, 1, msg)
};