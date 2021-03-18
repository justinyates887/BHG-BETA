const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const reqObj = {
    type: [Object],
    required: true
}

const serverStatsSchema = mongoose.Schema({ //[channelID, count]
    _id: reqString,
    users: reqObj,
    roles: reqObj,
    channels: reqObj,
    bots: reqObj
})

module.exports = mongoose.model('server-stats', serverStatsSchema)