const { handleReaction } = require('../features/rr')

module.exports = async (client, reaction, user) => {
    return handleReaction(reaction, user, false)

}