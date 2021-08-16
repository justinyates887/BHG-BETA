const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

/*

Logs will need to be redefined to contain all logs, and have a boolean attatched as to whether or not 
the specific log is desired by the server;

ae:

replaced desried with...

userLeaves: {
    type: Boolean,
    required: true,
    default: false
}

but also have an enable all command

enableAll: {
    type: Boolean,
    required: true,
    default: false
}

Commands will have to have a list which shows what logs are enable/disabled

ae:

userLeave:  ✅
userJoin:   ❌

Commands will have to allow user to either:
b!logs enable all
b!logs enable userLeave || user leave
b!logs disable userJoin || user join

*/

const logsSchema = mongoose.Schema({
    _id: reqString,     //guildID
    cID: reqString,     //channel where logs will be sent
    desired: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('logs', logsSchema);