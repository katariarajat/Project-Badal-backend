const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userschema = new Schema({
    email: String,
    password: String,
    name: String,
    username : String,
    address: String,
    pincode: String,
    utype: {type: String, enum: ["NGO", "COMP","CORE"]} ,
    ngoId : {
        type: Schema.Types.ObjectId,
        ref: 'Ngo'
    },
    orgId : {
        type: Schema.Types.ObjectId,
        ref: 'Organisation'
    },
    coreId : {
        type: Schema.Types.ObjectId,
        ref: 'Core'
    },
    isAdmin : {type :String, enum: ["YES","NO"]},
    updated_at: String,
    created_at: String,
    deleted_at: String,
    skill : [{
        type: Schema.Types.ObjectId,
        ref: 'SkillTags'
    }]
});

module.exports = mongoose.model('User',userschema);
