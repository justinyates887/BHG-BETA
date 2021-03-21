module.exports = {
    name: 'simjoin',
    description: 'allows for testing of join methods for developers',

    execute(client, msg, args){
        if(!msg.member.id === '558443383018881034' || !msg.member.id === '498323912514600960'){
            return
        }

        return client.emit('guildMemberAdd', msg.member);
    }
}