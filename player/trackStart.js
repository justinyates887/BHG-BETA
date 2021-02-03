module.exports = (client, msg, track) => {
    msg.channel.send(`${client.emotes.music} - Now playing ${track.title} into ${msg.member.voice.channel.name} ...`);
};