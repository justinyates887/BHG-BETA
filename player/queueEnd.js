module.exports = (client, msg, queue) => {
    msg.channel.send(`${client.emotes.error} - Music stopped as there is no more music in the queue !`);
};