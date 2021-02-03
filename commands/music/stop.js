module.exports = {
    name: 'stop',
    aliases: ['dc'],
    category: 'Music',
    utilisation: '{prefix}stop',

    execute(client, msg) {
        if (!msg.member.voice.channel) return msg.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(msg)) return msg.channel.send(`${client.emotes.error} - No music currently playing !`);

        client.player.setRepeatMode(msg, false);
        client.player.stop(msg);

        msg.channel.send(`${client.emotes.success} - Music **stopped** into this server !`);
    },
};