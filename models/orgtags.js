const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrgtagsSchema = new Schema({
    Tags : String,
});

module.exports = mongoose.model('OrgTags', eventSchema);