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

*/

const socialsSchema = mongoose.Schema({
    _id: reqString,                          //store the guild id here
    youtubeCIDs: reqObj,                    //store an array of channel IDs for youtube channel
    twitchCIDs: reqObj,                     //store an array of channel IDs for twitch channel
    twitterCIDs: reqObj,                    //store an array of twitter profiles to recieve updates from
    liveNotificationChannel: reqString,     //store Discord channel where youtube/twitch notifications go
    twitterUpdateChannel: reqString         //store Discord channel where tweets will be sent
});

module.exports = mongoose.model('socials', socialsSchema);