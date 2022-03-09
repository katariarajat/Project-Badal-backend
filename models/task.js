const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{
        type:String,
    },
    brief:{
        type: String,
    },
    assigned_to: String,
    ModuleId: String,
    created_at: String,
    updated_at:String,
    status: String,
});

module.exports = mongoose.model('Task', eventSchema);