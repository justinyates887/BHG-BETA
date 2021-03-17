//this functions will get the set roles from a channel
const rolesCache = {} // {[guildID: [roles]]}
const mongo = require('../../mongo');
const guildRolesSchema = require ('./schemas/guild-roles-schema')

module.exports.getRoles = async (guildID) => {
    const cachedRoles = rolesCache[guildID]
    if(cachedRoles){
        return cachedRoles;
    }

    return await mongo()
    .then(async (mongoose) => {
        try{
            const result = await guildRolesSchema.findOne({
                _id: guildID
            })

            rolesCache[guildID] = [result.admin, result.base, result.mute];

            return result
        } catch(err){
            console.error(`Error at getRoles.js(17): ${err}`)
        }
    })
}