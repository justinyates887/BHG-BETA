module.exports = {
    name: 'queue',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}queue',

    execute(client, msg) {
        if (!msg.member.voice.channel) return msg.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        const queue = client.player.getQueue(msg);

        if (!client.player.getQueue(msg)) return msg.channel.send(`${client.emotes.error} - No songs currently playing !`);

        msg.channel.send(`**Server queue - ${msg.guild.name} ${client.emotes.queue} ${client.player.getQueue(msg).loopMode ? '(looped)' : ''}**\nCurrent : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** other songs...` : `In the playlist **${queue.tracks.length}** song(s)...`}`));
    },
};