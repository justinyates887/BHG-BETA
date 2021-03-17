const redis = require('redis')
require('dotenv').config()

module.exports = async () => {
    return await new Promise((resolve, reject) => {
        const client = redis.createClient({
            url: process.env.REDIS
        })

        client.on('error', (err) => {
            console.error('Redis error at redis.js: ' + err);
            client.quit();
            reject(err)
        })

        client.on('ready', () => {
            resolve(client)
        })
    })
}

module.exports.expire = (callback) => {
    const expired = () => {
        const sub = redis.createClient({ url: process.env.REDIS})
        sub.subscribe('__keyevent@0__:expired', () => {
            sub.on('msg', (channel, msg) => {
                callback(msg)
            })
        })
    }

    const pub = redis.createClient({ url: process.env.REDIS})
    pub.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], expired())
}
