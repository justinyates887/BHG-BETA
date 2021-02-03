module.exports = {
    name: 'filter',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}filter [filter name]',

    execute(client, msg, args) {
        if (!msg.member.voice.channel) return msg.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(msg)) return msg.channel.send(`${client.emotes.error} - No music currently playing !`);

        if (!args[0]) return msg.channel.send(`${client.emotes.error} - Please specify a valid filter to enable or disable !`);

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return msg.channel.send(`${client.emotes.error} - This filter doesn't exist, try for example (8D, vibrato, pulsator...) !`);

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(msg).filters[filterToUpdate] ? false : true;

        client.player.setFilters(msg, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) msg.channel.send(`${client.emotes.music} - I'm **adding** the filter to the music, please wait... Note : the longer the music is, the longer this will take.`);
        else msg.channel.send(`${client.emotes.music} - I'm **disabling** the filter on the music, please wait... Note : the longer the music is playing, the longer this will take.`);
    },
};