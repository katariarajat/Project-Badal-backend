const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name : String,
    description : String,
    problem_statement : String,
    fileUrl : String,
    domain : String,
    created_at : String,
    updated_at : String,
    deleted_at : String,
    ngoId : {
        type: Schema.Types.ObjectId,
        ref: 'Ngo'
    },
    repoId : String,
    status: {
        type : String, enum : ["ONGOING","COMPLETED"]
    },
    noOfModules : String,
    tags : [
        {
            type: Schema.Types.ObjectId,
            ref: 'SkillTags'
        }
    ],
    noOfModules : String,
    progress : String,
    gitlabProjectId : String,
    ssh_url_to_repo : String,
    http_url_to_repo : String,
    web_url : String,
});

module.exports = mongoose.model('Project', eventSchema);