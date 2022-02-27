const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userschema = new Schema({
    email: String,
    password: String,
    name: String,
    contact:String,
    address: String,
    pincode: String,
    type: String,
    created_at: String, 
    updated_at: String,
    deleted_at: String,
    organisationId: String,
});

module.exports = mongoose.model('User',userschema);
