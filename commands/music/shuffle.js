module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    category: 'Music',
    utilisation: '{prefix}shuffle',

    execute(client, msg) {
        if (!msg.member.voice.channel) return msg.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(msg)) return msg.channel.send(`${client.emotes.error} - No music currently playing !`);

        client.player.shuffle(msg);

        return msg.channel.send(`${client.emotes.success} - Queue shuffled **${client.player.getQueue(msg).tracks.length}** song(s) !`);
    },
};