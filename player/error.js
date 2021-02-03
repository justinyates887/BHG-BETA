module.exports = (client, error, msg) => {
    switch (error) {
        case 'NotPlaying':
            msg.channel.send(`${client.emotes.error} - There is no music being played on this server !`);
            break;
        case 'NotConnected':
            msg.channel.send(`${client.emotes.error} - You are not connected in any voice channel !`);
            break;
        case 'UnableToJoin':
            msg.channel.send(`${client.emotes.error} - I am not able to join your voice channel, please check my permissions !`);
            break;
        default:
            msg.channel.send(`${client.emotes.error} - Something went wrong ... Error : ${error}`);
    };
};
