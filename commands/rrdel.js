const reactionSchema = require('../setup/schemas/reaction-schema');
const bhconfig = require("../core/bhconfig.json"); //initialize bhconfig.json
const Discord = require("discord.js");
const { getRoles } = require('../setup/getRoles')

module.exports = {
    name: 'rrdel',
    description: 'deletes a reaction role to a message',

    async execute(client, msg, args){
        
    }
}