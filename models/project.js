const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name : String,
    description : String,
    problem_statement : String,
    fileUrl : String,
    domain : String,
    created_at : Date,
    updated_at : Date,
    deleted_at : Date,
    ngoId : {
        type: Schema.Types.ObjectId,
        ref: 'Ngo'
    },
    repoId : String,
    status: String,
    tags : [
        {
            type: Schema.Types.ObjectId,
            ref: 'ProjectTags'
        }
    ]
});

module.exports = mongoose.model('Project', eventSchema);