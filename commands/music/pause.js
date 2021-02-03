module.exports = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}pause',

    execute(client, msg) {
        if (!msg.member.voice.channel) return msg.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(msg)) return msg.channel.send(`${client.emotes.error} - No music currently playing !`);

        if (client.player.getQueue(msg).paused) return msg.channel.send(`${client.emotes.error} - The music is already paused !`);

        client.player.pause(msg);

        msg.channel.send(`${client.emotes.success} - Song ${client.player.getQueue(msg).playing.title} paused !`);
    },
};