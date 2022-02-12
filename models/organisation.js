const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
    name:{
        type: String,
    },
    address: {
         type: String,
    },
    pincode:{
        type:Number
    },
    contact:{
        type: String
    },
    size:{
        type: String,
    },
    company_description:{
        type: String,
    },
    type: {
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

module.exports = mongoose.model('Organisation', OrganisationSchema);