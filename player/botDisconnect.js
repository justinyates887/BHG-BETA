module.exports = (client, msg, queue) => {
    msg.channel.send(`${client.emotes.error} - Music stopped as i have been disconnected from the channel !`);
};