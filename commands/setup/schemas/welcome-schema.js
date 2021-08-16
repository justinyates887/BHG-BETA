const mongoose = require('mongoose')

const welcomeSchema = mongoose.Schema({
    _id: {
        type: String, 
        required: true
    },
    channelID: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('welcome-channels', welcomeSchema);