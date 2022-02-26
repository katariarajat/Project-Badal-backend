const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userschema = new Schema({
    name:{
        type: String,
    },
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    contact:{
        type: String,
    },
    address:{
        type: String,
    },
    pincode:{
        type: String,
    },
    type:{
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
    organisationId:{
        types: Schema.Types.ObjectId,
        ref:"Organisation" 
    },
});

module.exports = mongoose.model('User',userschema);
