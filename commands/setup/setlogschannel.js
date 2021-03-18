const mongo = require("../../mongo");
const logsSchema = require('./schemas/logs-schema')

module.exports = {
    name: 'setlogschannel',
    description: 'allows guild to set a logs channel',

    async execute(client, msg, args){
        let target = msg.mentions.channels.first();

        await mongo()
        .then(async mongoose => {
            try {
                await logsSchema.findOneAndUpdate({
                    _id: msg.guild.id
                }, {
                    cID: target.id,
                    desired: true
                }, {
                    upsert: true
                })
            } catch(err){
                return console.error(`Error at setlogschannel(23): ${err}`)
            }
        })

        msg.reply(`Logs channel set to ${target}`)
    }
}

module.exports.checkLogs = async (guildID) => {
    await mongo()
    .then(async mongoose => {
        const result = await logsSchema.findOne({ _id: guildID });

        if(result.desired === true){
            return result;
        } else {
            return
        }
    })
}