const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    frontend:[
        {
            type:String,
        }
    ],
    backend:[
        {
            type:String,
        }
    ],
    generalSkill:[
        {
            type:String
        }
    ],
    technologies:[
        {
            type: String,
        }
    ],
    teamId:{
        types: Schema.Types.ObjectId,
        ref: "Team",
    }
    
});

module.exports = mongoose.model('TaskMeta', eventSchema);