const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const messageSchema = new mongoose.Schema({
    guildID: reqString,
    channelID: reqString,
    messageID: reqString,
    roles: [{
        emoji: reqString,
        roleID: reqString
    }]
})

module.exports = mongoose.model('message-schema', messageSchema) 