const Team = require("../../models/teams")

module.exports = {
    createTeam: async function(req, args){
        try{
            const team = await Team.findOne({name: args.teaminput.name});
            if(team){
                throw new Error('Team Name already exists');
            }
            else 
            {
                const newteam= new Team({
                    name: args.teaminput.name,
                    ModuleId: null,
                    participants : [req.userId],
                    taskMeta: null,
                    organisation: args.teaminput.organisation, 
                });

                newteam.save().then(result => {
                    return {...result._doc,_id: result.id};
                }).catch(err => {
                    throw err;
                });
            }
        }
        catch{
            throw err;
        }
    },

    ShowTeams: async () => {
        try{
            const Allteams = await Team.find({});
            if(!Allteams)
            {
                throw new Error('No Team Added');
            }
            return Allteams.map(team => {
                return {...team._doc,
                    _id: team.id}
            })
        }
        catch{
            throw err;
        }
        
    }   
}