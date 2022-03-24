const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NgoSchema = new Schema({
    name:{
        type: String,
    },
    address: {
         type: String,
    },
    phoneNumber: {
        type: String
    },
    pincode:{
        type : String
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
    },
    tags : [
        {
            type: Schema.Types.ObjectId,
            ref : "OrgTags"
        }
    ]
});

module.exports = mongoose.model('Ngo', NgoSchema);