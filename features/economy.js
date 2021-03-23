const mongo = require('../mongo')
const profileSchema = require('../commands/setup/schemas/profile-schema')

const coinsCache = {} //{'guildID-uID': coins}

module.exports = (client) => {

}

module.exports.addCoins = async (guildID, uID, coins) => {
     await mongo()
    .then(async (mongoose) => {
        try{
            const result = await profileSchema.findOneAndUpdate({
                _id: uID,
                gID: guildID
            }, {
                _id: uID,
                gID: guildID,
                $inc: {
                    coins
                }
            }, {
                upsert: true,
                new: true
            })

            coinsCache[`${guildID}-${uID}`] = result.coins
            const cr = result.coins
            return cr
        } catch (err){
            return console.error(`Error in db economy.js(32): ${err}`)
        }
    })
}

module.exports.removeCoins = async (guildID, uID, coins) => {
    await mongo()
    .then(async mongoose => {
        try{
            profileSchema.findOneAndUpdate({
                _id: uID
            }, {
                _id: uID,
                gID: guildID,
                coins: coins
            }, {
                upsert: true
            })
        }catch(err){
            console.error(`Error at economy.js(43): ${err}`)
        }
    })
}

module.exports.getCoins = async (guildID, uID) => {
    const cachedValue = coinsCache[`${guildID}-${uID}`]
    if(cachedValue){
        return cachedValue
    }

    return await mongo()
    .then(async mongoose => {
        try{
            const result = await profileSchema.findOne({
                _id: uID,
                gID: guildID
            })

            let coins = 0;
            if(result){
                coins = result.coins
            } else {
                await new profileSchema({
                    _id: uID,
                    gID: guildID,
                    coins,
                    xp,
                    level
                }).save()
            }

            coinsCache[`${guildID}-${uID}`] = coins

            return coins
        } catch (err){
            console.error(`Error in db economy.js(68): ${err}`)
        }
    })
}
