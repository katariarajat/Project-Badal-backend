const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    description:{
        type: String,
    },
    status:{
        type: String,
    },
    start_date:{
        type: Date,
    },
    end_date:{
        type: Date,
    },
    created_at:{
        type:Date,
    },
    updated_at:{
        type:Date,
    },
    deleted_at:{
        type:Date,
    },
    api_build:[
        {
            type: String,
        }
    ],
    skills : [
        {
            type : Schema.Types.ObjectId,
            ref: 'SkillTags'
        }
    ],
    ui_screen : [String],
    db_tables : [String],
    assigned_to:{
        type : Schema.Types.ObjectId,
        ref: 'ModuleTeam'
    },
    commit_id : String,
    repo : String,
    tags : [
        {
        type : Schema.Types.ObjectId,
        ref: 'ModuleTags'
        }   
    ]
        
});

module.exports = mongoose.model('Module', eventSchema);