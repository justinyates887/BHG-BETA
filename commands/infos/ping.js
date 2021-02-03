module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}ping',

    execute(client, msg) {
        msg.channel.send(`${client.emotes.success} - Ping : **${client.ws.ping}ms** !`);
    },
};