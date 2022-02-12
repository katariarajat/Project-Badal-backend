const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{
        type: String,
    },
    ModuleId:[
        {
        types: Schema.Types.ObjectId,
        ref: 'Module'
        }
    ],
    participants : [
            {
                types: Schema.Types.ObjectId,
                ref: 'Participants'
            }
    ],
    taskMeta : [
        {
            types: Schema.Types.ObjectId,
            ref: 'TaskMeta'
        }
    ],
    organisation : {
        types: Schema.Types.ObjectId,
        ref: 'Organisation'
    }
});

module.exports = mongoose.model('Team', eventSchema);