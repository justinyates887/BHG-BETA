module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    category: 'Music',
    utilisation: '{prefix}loop',

    execute(client, msg, args) {
        if (!msg.member.voice.channel) return msg.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(msg)) return msg.channel.send(`${client.emotes.error} - No music currently playing !`);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(msg).loopMode) {
                client.player.setLoopMode(msg, false);
                return msg.channel.send(`${client.emotes.success} - Repeat mode **disabled** !`);
            } else {
                client.player.setLoopMode(msg, true);
                return msg.channel.send(`${client.emotes.success} - Repeat mode **enabled** the whole queue will be repeated endlessly !`);
            };
        } else {
            if (client.player.getQueue(msg).repeatMode) {
                client.player.setRepeatMode(msg, false);
                return msg.channel.send(`${client.emotes.success} - Repeat mode **disabled** !`);
            } else {
                client.player.setRepeatMode(msg, true);
                return msg.channel.send(`${client.emotes.success} - Repeat mode **enabled** the current music will be repeated endlessly !`);
            };
        };
    },
};