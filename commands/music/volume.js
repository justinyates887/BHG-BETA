module.exports = {
    name: 'volume',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}volume [1-100]',

    execute(client, msg, args) {
        if (!msg.member.voice.channel) return msg.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(msg)) return msg.channel.send(`${client.emotes.error} - No music currently playing !`);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return msg.channel.send(`${client.emotes.error} - Please enter a valid number !`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return msg.channel.send(`${client.emotes.error} - Please enter a valid number (between 1 and 100) !`);

        client.player.setVolume(msg, parseInt(args[0]));

        msg.channel.send(`${client.emotes.success} - Volume set to **${parseInt(args[0])}%** !`);
    },
};