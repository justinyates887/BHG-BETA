const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const profileSchema = mongoose.Schema({
    _id: reqString,
    uID: reqString,
    gID: reqString,
    coins: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('profiles', profileSchema)