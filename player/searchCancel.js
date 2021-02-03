module.exports = (client, msg, query, tracks) => {
    msg.channel.send(`${client.emotes.error} - You did not provide a valid response ... Please send the command again !`);
};