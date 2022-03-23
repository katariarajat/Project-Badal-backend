const Project = require("../../models/project");
const Team = require("../../models/team");
const User = require("../../models/user");

module.exports = {
    createTeam: async function(parent, args, context){
        try{
            const team = await Team.findOne({name: args.teaminput.name});
            if(team){
                throw new Error('Team Name already exists');
            }
            else 
            {
                const user = await user.findOne({_id : req.userId});

                const newteam= new Team({
                    name: args.teaminput.name,
                    ModuleId: null,
                    participants : [req.userId],
                    taskMeta: args.teaminput.taskMeta,
                    organisation: user.organisationId, 
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

    ShowTeamsForCompany: async (args) => {
        try{
            const Allteams = await Team.find({organisationId : args.organisationId});
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
    },
    
    ShowAllTeams: async () => {
        try{
            const teams = await Team.find();
            return teams.map(team => {
                return {...team._doc,_id: team.id};
            });
        }
        catch{
            new Error("Error in ShowAllTeams");
        }
    },

    AddUserToTeam: async (args) =>{
        const team = await Team.findOne({_id : args.teamId});
        for(let i = 0;i<args.userId.length;i++)
        {
            team.participants.push(args.userId[i]);
        }
        const result = await team.save();
        return {
            ...result._doc,
            _id: result.id
        };
    },
    AssignModuleToTeam: async (args) => {
        const team = await Team.findOne({_id : args.teamId});
        const project = await Project.findOne({_id: args.projectId});

        project.companies.push(organisationId);
        await project.save();

        team.ModuleId.push(args.moduleId);
        const result = await team.save();
        return {
            ...result._doc,
            _id: result.id
        };
    },
    
}