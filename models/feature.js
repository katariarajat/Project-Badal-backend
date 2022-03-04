const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const featureSchema = new Schema({

    endDate:{
        type: Date,
    },
    assigned_to:{   
        types: Schema.Types.ObjectId,
        ref: 'Team'
    },name: {
        type: String,
        required: true
    },
    meta: {
        type: String,
        required: true
    },
    brief:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true        
    },
    created_at:{
        type: String,
        required: true,
    },
    updated_at:{
        type: String,
        required: false,
    },
    assigned_at:{
        type: String,
        required: false
    },
    component:{
        type: String,
        required: false
    },
    startDate:{
        
    modules: {
        types: Schema.Types.ObjectId,
        ref: 'Module'
    }
});

module.exports = mongoose.model('Feature', featureSchema);