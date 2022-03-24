const Project = require("../../models/project");
const Team = require("../../models/team");
const User = require("../../models/user");
const {errorName, usertype} = require('../../constants');
const req = require("express/lib/request");
const ModuleTeam = require('../../models/moduleTeam');

module.exports = {
    createTeam: async (args, req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        try{
            const team = await Team.findOne({name: args.teaminput.name});
            if(team){
                throw new Error(errorName.ALREADY_EXIST);
            }
            else 
            {
                const newteam= new Team({
                    name: args.teaminput.name,
                    ModuleTeamAssign: null,
                    participants : args.teaminput.participants,
                    taskMeta: args.teaminput.taskMeta,
                    organisation: req.orgId, 
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
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        try{
            const Allteams = await Team.find({organisationId : req.orgId});
            return Allteams.map(team => {
                return {...team._doc,
                    _id: team.id}
            })
        }
        catch{
            throw err;
        }
    },
    
    ShowAllTeams: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        if(req.userType != usertype.IIITH)
        {
            throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
        }
        try{
            const teams = await Team.find();
            return teams.map(team => {
                return {...team._doc,_id: team.id};
            });
        }
        catch{
            throw err;
        }
    },

    AddUserToTeam: async (args,req) =>{
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        try{
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
        }
        catch {
            throw err;
        }
        
    },

    AssignModuleToTeam: async (args,req) => {
        
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }

        const moduleTeam = new ModuleTeam({
            moduleId : args.moduleId,
            Team : args.teamId,
            Status : "0",
            projectId : args.projectId,
            orgId : req.orgId,
        });
        
        const resultModuleTeam = await moduleTeam.save();

        return {
            ...resultModuleTeam._doc,
            _id: resultModuleTeam.id
        };
    },
    
}