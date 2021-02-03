module.exports = {
    name: 'clear-queue',
    aliases: ['cq'],
    category: 'Music',
    utilisation: '{prefix}clear-queue',

    execute(client, msg) {
        if (!msg.member.voice.channel) return msg.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(msg)) return msg.channel.send(`${client.emotes.error} - No music currently playing !`);

        if (client.player.getQueue(msg).tracks.length <= 1) return msg.channel.send(`${client.emotes.error} - There is only one song in the queue.`);

        client.player.clearQueue(msg);

        msg.channel.send(`${client.emotes.success} - The queue has just been **removed** !`);
    },
};