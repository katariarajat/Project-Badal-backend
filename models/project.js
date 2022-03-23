const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:String,
    brief:String,
    problem_statement:String,
    fileUrl:String,
    domain:String,
    created_at:String,
    updated_at : String,
    deleted_at : String,
    NGOId: String,
    status: String,
    companies :[
        {
            type: Schema.Types.ObjectId,
            ref: 'Organisation'
        }
    ]
});

module.exports = mongoose.model('Project', eventSchema);