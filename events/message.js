module.exports = (client, msg) => {
    if (msg.author.bot || msg.channel.type === 'dm') return;

    const prefix = client.config.discord.prefix;

    if (msg.content.indexOf(prefix) !== 0) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, msg, args);
};