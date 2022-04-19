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
        const team = await Team.findOne({name: args.teaminput.name, orgId  : args.teaminput.orgId});
        if(team){
            throw new Error(errorName.ALREADY_EXIST);
        }
        else 
        {
            var orgId = (args.teaminput.orgId)?args.teaminput.orgId:req.orgId;
            console.log(orgId, args.teaminput.orgId);
            const newteam= new Team({
                name : args.teaminput.name,
                participants : args.teaminput.participants,
                skill : args.teaminput.skill,
                orgId : orgId,
            });
            const result = await newteam.save();
            const finalresult = await Team.findOne({name : args.teaminput.name, orgId  : args.teaminput.orgId}).populate("skill").populate("orgId").populate("participants")
            return {...finalresult._doc,_id: finalresult.id };
        }
    },

    GetTeamsForCompany: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        try{
            const Allteams = await Team.find({organisation : args.orgId}).populate("skill").populate("orgId").populate("participants");
            return Allteams.map(team => {
                return {...team._doc,
                    _id: team.id}
            });
        }
        catch{
            throw err;
        }
    },
    
    GetAllTeams: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        console.log(args);
        // if(req.userType != usertype.CORE)
        // {
        //     throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
        // }
        try{
            const teams = await Team.find().populate("skill").populate("orgId").populate("participants");
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
        const oldModuleTeam = await ModuleTeam.findOne({orgId : req.orgId, projectId: args.projectId});
        const givenModule = await Module.findOne({_id : args.moduleId});
        givenModule.assigned_to = args.teamId;
        if(!oldModuleTeam)
        {
            const moduleTeam = new ModuleTeam({
                modules : [
                    {
                        moduleId : args.moduleId,
                        team : args.teamId,
                        Status : "0"
                    }
                ],
                projectId : givenModule.projectId,
                orgId : req.orgId,
            }); 
            
            const resultModuleTeam = await moduleTeam.save();
            
            await givenModule.save();
            return {
                ...resultModuleTeam._doc,
                _id: resultModuleTeam.id
            };
        }
        else 
        {
            const module = {
                moduleId: args.moduleId,
                team : args.teamId,
                Status : "0",
            }
            oldModuleTeam.modules.push(module);
            const resultModuleTeam = await oldModuleTeam.save();
            
            return {
                ...resultModuleTeam._doc,
                _id: resultModuleTeam.id
            };
        }
    },
    
}