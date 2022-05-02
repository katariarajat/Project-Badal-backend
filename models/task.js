const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{
        type:String,
    },
    description :{
        type: String,
    },
    ModuleId: {
        type: Schema.Types.ObjectId,
        ref : "Module"
    },
    created_at: String,
    updated_at:String,
    status: {
        type : String,
        enum : ["ONGOING","COMPLETED"]
    },
    assigned_to : {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
});


module.exports = mongoose.model('Task', eventSchema);