const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    address: {
         type: String,
    },
    phoneNumber: {
        type: String
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
        type: String,
    },
    updated_at:{
        type: String,
    },
    deleted_at:{
        type:String,
    },
    tags : [
        {
            type: Schema.Types.ObjectId,
            ref : "SkillTags"
        }
    ]
});

module.exports = mongoose.model('Organisation', OrganisationSchema);