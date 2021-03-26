const mongoose = require('mongoose');

const reactionSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    mID: {
        type: String,
        required: true
    },
    cID: {
        type: String,
        required: true
    },
    reaction: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('reactions', reactionSchema)