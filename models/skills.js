const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    skill : {
            type: String,
            required: true
    },
    user : {
        type : Number,
        enum : [0,1]
    },
    project : {
        type : Number,
        enum : [0,1]
    }
});

module.exports = mongoose.model('SkillTags', eventSchema);