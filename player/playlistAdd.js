module.exports = (client, msg, queue, playlist) => {
    msg.channel.send(`${client.emotes.music} - ${playlist.title} has been added to the queue (**${playlist.tracks.length}** songs) !`);
};