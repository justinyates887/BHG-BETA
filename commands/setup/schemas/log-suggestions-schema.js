const mongoose = require('mongoose')

const logSuggestionsSchema = mongoose.Schema({
    guild: {
        type: String,
        required: true
    },
    sID: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    mID: {
        type: String,
        required: true
    },
    uID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('suggestion-logs', logSuggestionsSchema)