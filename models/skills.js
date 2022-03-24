const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    skill : {
            type: String,
            required: true
    },
});

module.exports = mongoose.model('SkillTags', eventSchema);