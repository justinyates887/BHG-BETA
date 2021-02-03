module.exports = (client, msg, query, tracks) => {
    msg.channel.send({
        embed: {
            color: 'BLUE',
            author: { name: `Here are your search results for ${query}` },
            footer: { text: 'Blue Haired Girl By SmallBlue Dev' },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    });
};