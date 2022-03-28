const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    moduleTeamAssign: {
            types: Schema.Types.ObjectId,
            ref: 'ModuleTeam'
        }
    ,
    projectId:
        {
            types: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ,
    organisation:{
        types: Schema.Types.ObjectId,
        ref: 'Organisation'
    },
    created_at:{
        type:String
    },
    updated_at:{
        type:String,
    },
    Teams: {
            types: Schema.Types.ObjectId,
            ref: 'Team'
        }
});

module.exports = mongoose.model('Module_Team_Solution', eventSchema);