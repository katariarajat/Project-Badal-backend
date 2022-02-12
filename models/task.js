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
    FeatureId:{
        types: Schema.Types.ObjectId,
        ref: 'Feature' 
    },
    created_at:{
        type:Date,
    },
    updated_at:{
        type:Date,
    },
    participantsId:[
        {
            types: Schema.Types.ObjectId,
            ref: 'Participant'
        }
    ]
});

module.exports = mongoose.model('Task', eventSchema);