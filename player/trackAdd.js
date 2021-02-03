module.exports = (client, msg, queue, track) => {
    msg.channel.send(`${client.emotes.music} - ${track.title} has been added to the queue !`);
};