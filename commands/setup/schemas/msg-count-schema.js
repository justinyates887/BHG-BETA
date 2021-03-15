const mongoose = require('mongoose');

const msgCountSchema = mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },
    gID: {
        type: Number,
        required: true
    },
    msgCount: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('msg-count', msgCountSchema)