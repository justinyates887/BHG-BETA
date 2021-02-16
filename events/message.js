/**NOTE: THIS FUNCTION STORES THE DATA UNDER USER ID, NOT GUILD. NEED TO CHANGE TO GUILD SPECIFIC */

const mongo = require('../mongo');
const msgCountSchema = require('../commands/setup/schemas/msg-count-schema');

module.exports = async (client, msg) => {
    if (msg.author.bot || msg.channel.type === 'dm') return;

    const { author } = msg;
    const { id } = author;

    await mongo().then(async mongoose => {
        try{
            await msgCountSchema.findByIdAndUpdate({
                _id: id
            }, 
            {
                $inc: {
                    'msgCount': 1
                }, 
            },
            {
                upsert: true
            }).exec()
        } finally{
            mongoose.connection.close();
        }
    })

    const prefix = guildPrefixes[guild.id] || client.config.discord.prefix;

    if (msg.content.indexOf(prefix) !== 0) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, msg, args);
};