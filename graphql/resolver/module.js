const Module = require('../../models/module');
const team = require('../../models/team');
const { errorName, usertype, errorType} = require('../../constants');
const req = require('express/lib/request');
const ModuleTeam = require('../../models/moduleTeam');
const Project = require('../../models/project');

module.exports = {
    AddModuleToProjectById : async (args,req) => {
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        if(req.userType != usertype.CORE)
        {
            throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
        }
        try{
            const newModule= new Module({
                projectId: args.moduleInput.projectId,
                description: args.moduleInput.description,
                status: "UNASSIGNED",
                name : args.moduleInput.name,
                start_date : args.moduleInput.start_date,
                end_date: null,
                created_at: new Date().toString(),
                updated_at: new Date().toString(),
                deleted_at: null,
                ui_screen : args.moduleInput.ui_screen,
                api_build : args.moduleInput.api_build,
                commit_id : args.moduleInput.commit_id,
                repo : args.moduleInput.repo,
                db_tables : args.moduleInput.db_tables,
                skills : args.moduleInput.skills,
                noOfTasks : "0",
                noOfCompletedTasks: "0",

            });
            const result = await newModule.save();
            
            // increasing the modules count in project
            const project = await Project.findOne({_id : args.moduleInput.projectId});
            var k = parseInt(project.noOfModules)+1;
            project.noOfModules = k.toString();
            var noOfCompletedModules = await Module.countDocuments({projectId : args.moduleInput.projectId,status: "COMPLETED"});
            project.progress = ((noOfCompletedModules/k)*100).toString();
            await project.save();
            // Done Project Change
            return {...result._doc,_id:result.id};
        }
        catch{
            throw err;
        }
    },
    GetModuleForProjectById : async (args,req) => {
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        try{
            const modules = await Module.find({projectId: args.projectId}).populate('skills');
            console.log(modules);
            return modules.map(modules => {
                return {...modules._doc,_id: modules.id};
            });
        }
        catch{
            throw err;
        }
    },
    UpdateModuleStatus: async (args,req) => {
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        try{
            ModuleTeam.updateOne({'modules.moduleId' : args.moduleId},
            {
                '$set' : {
                    'modules.$.Status' : args.status,
                },
                function(err,module) {
                    if(err)
                    {
                        throw err;
                    }
                    else 
                    {
                        return args.status;
                    }
                }
            });
            const project = await Project.findOne({_id : args.moduleInput.projectId});
            var k = parseInt(project.noOfModules);
            var noOfCompletedModules = await Module.countDocuments({projectId : args.moduleInput.projectId,status: "COMPLETED"});
            project.progress = ((noOfCompletedModules/k)*100).toString();
            await project.save();
            
        }
        catch{
            throw err;
        }
        
    },
    
}