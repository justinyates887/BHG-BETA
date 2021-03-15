const fs = require("fs");
const Discord = require("discord.js");
const rr = require('../features/rr')

module.exports = (client, reaction, user) => {
    rr.handleReaction(reaction, user, true)
    
}