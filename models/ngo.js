const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NgoSchema = new Schema({
    name:{
        type: String,
    },
    email:{
        type:String, 
    },
    address: {
         type: String,
    },
    pincode:{
        type : String
    },
    contact:{
        type: String,
    },
    size:{
        type: String,
    },
    company_description:{
        type: String,
    },
    urlWebsite:{
        type:String
    },
    created_at:{
        type: Date,
    },
    updated_at:{
        type: Date,
    },
    deleted_at:{
        type:Date,
    }
});

module.exports = mongoose.model('Ngo', NgoSchema);