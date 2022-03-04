const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{
        type:String,
    },
    brief:{
        type: String,
    },
    assigned_to:{
        types: Schema.Types.ObjectId,
        ref:'Team'
    },
    ModuleId:{
        types: Schema.Types.ObjectId,
        ref: 'Module' 
    },
    created_at:{
        type:Date,
    },
    updated_at:{
        type:Date,
    },
});

module.exports = mongoose.model('Task', eventSchema);