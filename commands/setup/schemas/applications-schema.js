const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const reqObj = {
    type: [Object],
    required: true
}

/*

This is a premium feature.
Allow in setup code to add one of each channel unless server owner is premium member.

Preffered usage:
!apply
(Bot Dms user to ask questions)
(Application answers are sent in embed with user and avatar to specified channel)

*/

const applicationSchema = mongoose.Schema({
    _id: reqString,             //guildID
    questions: reqObj,          //Array of up to 10 questions
    sendChannel: reqString      //Discord channel to send the completed application to

});

module.exports = mongoose.model('applications', applicationSchema);