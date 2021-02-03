module.exports = (client, msg, query) => {
    msg.channel.send(`${client.emotes.error} - No results found on YouTube for ${query} !`);
};