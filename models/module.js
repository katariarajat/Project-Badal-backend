const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    name : {
        type: String
    },
    description:{
        type: String,
    },
    status:{
        type: String,
    },
    start_date:{
        type: String,
    },
    end_date:{
        type: String,
    },
    created_at:{
        type:String,
    },
    updated_at:{
        type:String,
    },
    deleted_at:{
        type:String,
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
    commit_id : String,
    repo : String,
        
});

module.exports = mongoose.model('Module', eventSchema);