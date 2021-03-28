const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
    await mongoose.connect(process.env.MONGO, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection
        .on('error', (error) => {
            console.error('Error at mongo.js :' + error)
        })
        .on('open', () => {
            console.log('[mongoose] connected')
        })
        .on('close', () => {
            console.log('[mongoose] connection closed')
        })
        .on('connecting', () => {
            console.log('[mongoose] connecting...')
        })
        .on('reconnected', () => {
            console.log('[mongoose] reconnected after interrupt')
        })
        .on('reconnectFailed', error => {
            console.error('[mongoose] reconnection failed due to error:' + error);
        })

    return mongoose;
}