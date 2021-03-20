const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'close',
    description: 'closes a ticket channel',

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

        if(!msg.channel.name.startsWith('ticket-')){
            return msg.channel.send('This is not a ticket channel')
        }

        return msg.channel.delete()
    }
}