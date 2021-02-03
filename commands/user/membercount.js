const bhconfig = require("../core/bhconfig.json");
const fs = require("fs");
const Discord = require("discord.js");

const registerEvent = (client) => {

    client.on('guildMemberAdd' , (member) => {updateMember(member.guild);});
    client.on('guildMemberRemove' , (member) => {updateMember(member.guild);});

}

module.exports = {
    name: 'membercount',
    description: 'creates private voice channels based on guild stats',

    execute(client, msg, args, logs, blueLogs){
        const { guild } = msg;

        const updateMembers = guild => {
            let memberRegex = /Member Count:/ig;
            let memberChannel = guild.channels.cache.get(memberRegex);

            if(!memberChannel){

                guild.channels.create(`Member Count: ${guild.memberCount.toLocaleString()}`, {
                    type: 'voice',
                    permissionOverwrites: [
                        {
                            id: msg.guild.id,
                            allow: ['VIEW_CHANNEL'],
                            deny: ['CONNECT']
                        }]
                    })
            } else {
                memberChannel.setName(`Member Count: ${guild.memberCount.toLocaleString()}`);
            }
        }
        updateMembers(guild);
        registerEvent(client);
    }
}