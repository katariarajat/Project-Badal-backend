const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userschema = new Schema({
    email: String,
    password: String,
    name: String,
    username : String,
    address: String,
    pincode: String,
    type: {type: String, enum: ["NGO", "ORG","IIIT"]} ,
    ngoId : {
        type: Schema.Types.ObjectId,
        ref: 'Ngo'
    },
    orgId : {
        type: Schema.Types.ObjectId,
        ref: 'Organisation'
    },
    iscore : String,
    created_at: Date, 
    updated_at: Date,
    deleted_at: Date,
});

module.exports = mongoose.model('User',userschema);
