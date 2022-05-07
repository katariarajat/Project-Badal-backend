const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    moduleId : {
        type : Schema.Types.ObjectId,
        ref: 'Module'
    },
    teamId : {
        type : Schema.Types.ObjectId,
        ref: 'Team'
    },
    projectId : String,
    orgId : String
    
});

module.exports = mongoose.model('ModuleTeam', eventSchema);