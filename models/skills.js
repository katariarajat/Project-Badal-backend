const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    skillset : [
        {
            type: String,
            required: true
        }
    ]
});

module.exports = mongoose.model('Event', eventSchema);