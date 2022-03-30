const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    modules : [
        {
            moduleId : {
                type : Schema.Types.ObjectId,
                ref: 'Module'
            },
            team : {
                type : Schema.Types.ObjectId,
                ref: 'Team'
            },
            Status : String,
        }
    ],
    projectId : {
        type : Schema.Types.ObjectId,
        ref: 'Project'
    },
    orgId : 
    {
        type : Schema.Types.ObjectId,
        ref: 'Organisation'
    }
});

module.exports = mongoose.model('ModuleTeam', eventSchema);