module.exports = {
    name: 'musichelp',
    aliases: ['musichelp'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',

    execute(client, msg, args) {
        if (!args[0]) {
            const infos = msg.client.commands.filter(x => x.category == 'Infos').map((x) => '`' + x.name + '`').join(', ');
            const music = msg.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');

            msg.channel.send({
                embed: {
                    color: '#486dAA',
                    author: { name: 'Help pannel' },
                    footer: { text: 'Blue Haired Girl By SmallBlue Dev' },
                    fields: [
                        { name: 'Bot', value: infos },
                        { name: 'Music', value: music },
                        { name: 'Filters', value: client.filters.map((x) => '`' + x + '`').join(', ') },
                    ],
                    timestamp: new Date(),
                    description: `To use filters, ${client.config.discord.prefix}filter (the filter). Example : ${client.config.discord.prefix}filter 8D.\n\n\
                    Don't forget to add the Music bot for additional channels! :  https://tinyurl.com/bkcggzki`,
                },
            });
        } else {
            const command = msg.client.commands.get(args.join(" ").toLowerCase()) || msg.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return msg.channel.send(`${client.emotes.error} - I did not find this command !`);

            msg.channel.send({
                embed: {
                    color: 'ORANGE',
                    author: { name: 'Help pannel' },
                    footer: { text: 'Blue Haired Girl By SmallBlue Dev' },
                    fields: [
                        { name: 'Name', value: command.name, inline: true },
                        { name: 'Category', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
                }
            });
        };
    },
};