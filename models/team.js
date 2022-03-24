const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{
        type: String,
    },
    ModuleTeamAssign:[
        {
        type: Schema.Types.ObjectId,
        ref: 'ModuleTeam'
        }
    ],
    participants : [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
    ],
    taskMeta : [
        {
            type : Schema.Types.ObjectId,
            ref: 'SkillTags'
        }
    ],
    organisationId : {
        type : Schema.Types.ObjectId,
        ref: 'Organisation'
    }
});

module.exports = mongoose.model('Team', eventSchema);