const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    frontEnd : [
        {
            type: Schema.Types.ObjectId,
            ref: 'SkillTags',
        }
    ],
    BackEnd : [
        {
            type: Schema.Types.ObjectId,
            ref: 'SkillTags',
        }
    ],
    GeneralSkills : [
        {
            type: Schema.Types.ObjectId,
            ref: 'SkillTags',
        }
    ],
    Technologies : [
        {
            type: Schema.Types.ObjectId,
            ref: 'SkillTags',
        }
    ],
    Tags : String
});

module.exports = mongoose.model('SkillMeta', eventSchema);