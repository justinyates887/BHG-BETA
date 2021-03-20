const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'add',
    description: 'adds a user to the channel',

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

        const channel = msg.channel;
        const target = msg.mentions.users.first();
        if(!target){
            return msg.reply('Please specify a valid target')
        }
        channel.updateOverwrite(target, { VIEW_CHANNEL: true, SEND_MESSAGES: true })
    }
}