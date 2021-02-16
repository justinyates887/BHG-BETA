const guildPrefixes = {}
const mongo = require('../mongo');
const commandPrefixSchema = require('../commands/setup/schemas/command-prefix-schema')

module.exports = {
    emojis: {
        off: ':x:',
        error: ':warning:',
        queue: ':bar_chart:',
        music: ':musical_note:',
        success: ':white_check_mark:',
    },
  
    discord: {
        token: 'Nzk3ODg5NzE2ODE2MTgzMzE2.X_tCtA.N6bHZpRU1b6wEZ5KeprxHyCxjSk',
        prefix: 'bt!',
        //activity: 'ACTIVITY',
    },
    filters: ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding'],
  };

  module.exports.loadPrefixes = async (client) => {
      await mongo.then(async mongoose => {
          try{
              for (const guild of client.guilds.cache){
                const result = await commandPrefixSchema.findOne({ _id: guild[1].id })
                guildPrefixes[guild[1].id] = result.prefix
              }

          } finally{
              mongoose.connection.close();
          }
      })
  }