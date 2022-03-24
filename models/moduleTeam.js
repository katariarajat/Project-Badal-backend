const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    moduleId : {
        type : Schema.Types.ObjectId,
        ref: 'Module'
    },
    Team : {
        type : Schema.Types.ObjectId,
        ref: 'Team'
    },
    Status : String,
});

module.exports = mongoose.model('ModuleTeam', eventSchema);