const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userschema = new Schema({
    email: String,
    password: String,
    name: String,
    username : String,
    address: String,
    pincode: String,
    type: {type: String, enum: ["NGO", "ORG","IIITH"]} ,
    ngoId : {
        type: Schema.Types.ObjectId,
        ref: 'Ngo'
    },
    orgId : {
        type: Schema.Types.ObjectId,
        ref: 'Organisation'
    },
    iscore : String,
    updated_at: String,
    created_at: String, 
    deleted_at: String,
    skill : [{
        type: Schema.Types.ObjectId,
        ref: 'SkillTags'
    }]
});

module.exports = mongoose.model('User',userschema);
