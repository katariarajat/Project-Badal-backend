const Module = require('../../models/module')

module.exports = {
    AddModuleToProjectById : async (args) => {
        try{
            const newModule= new Module({
                projectId: args.moduleInput.projectId,
                description: args.moduleInput.description,
                status: args.moduleInput.status,
                start_date : args.moduleInput.start_date,
                end_date: null,
                created_at: new Date().toString(),
                updated_at: new Date().toString(),
                deleted_at: null,
                assigned_to: null,
            });
            const result = await newModule.save();
            return {...result._doc,_id:result.id};
        }
        catch{
            throw err;
        }
    },
    GetModuleForProjectById : async (args) => {
        try{
            const modules = await Module.find({projectId: args.projectId});
            return modules.map(modules => {
                return {...modules._doc,_id: modules.id};
            });
        }
        catch{
            throw err;
        }
    },
    UpdateModuleStatus: async (args) => {
        try{
            const module = await Module.findOne({_id:args.moduleId});
            module.status = args.status;
            const updated = await module.save();
            return {...updated._doc,_id:updated.id};
        }
        catch{
            throw err;
        }
        
    },
}