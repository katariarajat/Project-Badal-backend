const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    
    name:{
        type: String,
    },
    username:{
        type: String,
    },
    email:{
        type: String,
    },
    contact:{
        type: String,
    },
    refrenceId:{
        type: String,
    },
    address:{
        type: String,
    },
    pincode:{
        type: String,
    },
    password:{
        type: String,
    },
    created_at:{
        type: Date,
    },
    updated_at:{
        type: Date,
    },
    deleted_at:{
        type: Date,
    },
    teamId: {
        types: Schema.Types.ObjectId,
        ref: 'Team'
    }
});

module.exports = mongoose.model('Participant', eventSchema);