const Project = require("../../models/project");
const Team = require("../../models/team");
const User = require("../../models/user");
const {errorName, usertype} = require('../../constants');
const req = require("express/lib/request");
const ModuleTeam = require('../../models/moduleTeam');
const user = require("../../models/user");
const { returnModuleTeam } = require("../../GlobalFunction");
const Module = require("../../models/module");

async function returnTeam(teamId){
    const team = await Team.findOne({_id : teamId}).populate("participants").populate("skill").populate("orgId");
    return {...team._doc,_id: team.id };
}

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
            // console.log(args);
            // console.log(args.teaminput.participants.length);
            var orgId = (args.teaminput.orgId)?args.teaminput.orgId:req.orgId;
            // console.log("Debug statement = ",orgId, args.teaminput.orgId);
            let user_list = new Array(args.teaminput.participants.length);
            for(var i=0;i<args.teaminput.participants.length;i++)
            {
                const user = await User.findOne({_id : args.teaminput.participants[i]});
                user_list[i] = user;
                if(user.teamId != null)
                {
                    throw new Error(user.name + "Already exist in another team");
                }
            }
            const newteam= new Team({
                name : args.teaminput.name,
                participants : args.teaminput.participants,
                skill : args.teaminput.skill,
                orgId : orgId,
            });
            const result = await newteam.save();
            for(var i=0;i<user_list.length;i++)
            {
                user_list[i].teamId = result.id;
                await user_list[i].save();
            }
            const finalresult = await Team.findOne({name : args.teaminput.name, orgId  : orgId}).populate("skill").populate("orgId").populate("participants")
            return {...finalresult._doc,_id: finalresult.id };
        }
    },

    GetTeamsForCompany: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        try{
            console.log(args);
            const Allteams = await Team.find({orgId : args.orgId}).populate("skill").populate("orgId").populate("participants");
            console.log(Allteams);
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
            var user_list = []
            for(var i=0;i<length(args.teaminput.skill);i++)
            {
                const user = await User.findOne({_id : args.teaminput.participants[i]});
                user_list.append(user);
                if(user.teamId == null)
                {
                    throw new Error(user.name + "Already exist in another team");
                }
            }
            for(let i = 0;i<args.userId.length;i++)
            {
                team.participants.push(args.userId[i]);
            }
            const result = await team.save();
            for(var i=0;i<user_list.length();i++)
            {
                user_list[i].teamId = result.id;
                await user_list[i].save();
            }
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
        
        console.log("Hello");
        const temp = await ModuleTeam.findOne({moduleId : args.moduleId});
        if(temp)
        {
            throw new Error("Module is already assigned to another team.");
        }
        const module = await Module.findOne({_id: args.moduleId});
        
        module.assigned_to = args.teamId;
        await module.save();
        const team = await Team.findOne({_id : args.teamId});
        console.log(team);
        const moduleTeam = new ModuleTeam({
            moduleId : args.moduleId,
            teamId : args.teamId,
            projectId : module.projectId,
            orgId : team.orgId
        });
        const result = await moduleTeam.save();
        return returnModuleTeam(result.id);
    },
    GetTeamDetail: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        return returnTeam(args.teamId);
    },
    
}