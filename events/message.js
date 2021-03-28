const mongo = require('../mongo');
const { isInvite } = require('../commands/admin/antiad');
const antiAdSchema = require('../commands/setup/schemas/anti-ad-schema');
const { checkBlacklist } = require('../commands/setup/blacklist')
const { addXP } = require('../features/levels');
const { getRoles } = require('../commands/setup/getRoles')

module.exports = async (client, msg) => {
    if (msg.author.bot || msg.channel.type === 'dm') return;
    
    checkBlacklist(msg.guild.id, client, msg)

    //checks blue haired server for voters on top.gg
    // if(msg.guild.id === '795324515034726410'){
    //     let user = msg.author.id;
    //     let role = msg.guild.roles.cache.find((role) => {
    //         return role.id == '801158747070136330'; 
    //     })
    //     const member = msg.guild.members.cache.find((member) => {
    //         return member.id === msg.author.id;
    //     });
    //     dbl.hasVoted(user).then(voted => {
    //         if (voted) member.roles.add(role);
    //     });
    // }

    //checks if message is discord invite link
    if(msg.content.includes('discord.gg/')){
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
        
            const code = msg.content.split('discord.gg/')[1]
            const guild = msg.guild
            const isOurInvite = await isInvite(guild, code)
            if(isOurInvite === false){
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
                    console.error(`Error at db message.js(event)(73): ${err}`)
                    return
                }
            }
        }
    }

    //adds xp to user
    return addXP(msg.guild.id, msg.member.id, 1, msg)
};