const mongo = require('../mongo')
const profileSchema = require('../commands/setup/schemas/profile-schema')

const coinsCache = {} //{'guildID-uID': coins}

module.exports = (client) => {

}

module.exports.addCoins = async (guildID, uID, coins) => {
    try{
        const result = await profileSchema.findOneAndUpdate({
            uID: uID,
            gID: guildID
        }, {
            uID: uID,
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
}

module.exports.removeCoins = async (guildID, uID, coins) => {
    try{
        profileSchema.findOneAndUpdate({
            uID: uID
        }, {
            uID: uID,
            gID: guildID,
            coins: coins
        }, {
            upsert: true
        })
    }catch(err){
        console.error(`Error at economy.js(43): ${err}`)
    }
}

module.exports.getCoins = async (guildID, uID) => {
    const cachedValue = coinsCache[`${guildID}-${uID}`]
    if(cachedValue){
        return cachedValue
    }

    try{
        const result = await profileSchema.findOne({
            uID: uID,
            gID: guildID
        })

        let coins = 0;
        if(result){
            coins = result.coins
        } else {
            await new profileSchema({
                uID: uID,
                gID: guildID,
                coins,
                xp,
                level
            }).save()
        }

        coinsCache[`${guildID}-${uID}`] = coins

        return coins
    } catch (err){
        return console.error(`Error in db economy.js(68): ${err}`)
    }
}
