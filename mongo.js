const mongoose = require('mongoose');
const { mongoPath } = require('../BHG-BETA/commands/core/bhconfig.json');

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return mongoose;
}