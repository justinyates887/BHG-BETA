const mongoose = require('mongoose')

const welcomeSchema = mongoose.Schema({
    _id: {
        type: String, 
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('welcome-channels', welcomeSchema);