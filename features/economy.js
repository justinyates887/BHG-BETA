const mongo = require('../mongo')
const profileSchema = require('../commands/setup/schemas/profile-schema')

const coinsCache = {} //{'guildID-uID': coins}

module.exports = (client) => {

}

module.exports.addCoins = async (guildID, uID, coins) => {
    return await mongo()
    .then(async (mongoose) => {
        try{
            const result = await profileSchema.findOneAndUpdate({
                _id: guildID,
                uID
            }, {
                _id,
                uID,
                $inc: {
                    coins
                }
            }, {
                upsert: true,
                new: true
            })

            coinsCache[`${guildID}-${uID}`] = result.coins

            return result.coins
        } catch (err){
            console.log(err)
        } finally{
            mongoose.connection.close()
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
                _id,
                uID
            })

            let coins = 0;
            if(result){
                coins = result.coins
            } else {
                await new profileSchema({
                    _id: guildID,
                    uID,
                    coins,
                    xp,
                    level
                }).save()
            }

            coinscache[`${guildID}-${uID}`] = coins

            return coins
        } finally {
            mongoose.connection.close();
        }
    })
}
