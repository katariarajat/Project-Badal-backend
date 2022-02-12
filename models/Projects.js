const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{
        type:String,
    },
    brief:{
        type:String,
    },
    problem_statement:{
        type:String,
    },
    fileUrl:{
        type:String,
    },
    domain:{
        type:String,
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
    organisation: {
        types: Schema.Types.ObjectId,
        ref: 'Organisation'
    }
});

module.exports = mongoose.model('Project', eventSchema);