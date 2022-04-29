const Task = require("../../models/task");
const Module = require("../../models/module");
const {errorName,errorType} = require("../../constants");
const req = require("express/lib/request");
const ModuleTeam  = require("../../models/moduleTeam");

module.exports = {
    AddTaskToModuleById: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.DO_NOT_EXIST);
        }

        const module=await Module.findOne({_id: args.taskInput.ModuleId});
        if(!module)
        {
            throw Error("Module do not exits");
        }
        const newTask = new Task({
            name: args.taskInput.name,
            description: args.taskInput.description,
            status : "ONGOING",
            assigned_to: null,
            ModuleId: args.taskInput.ModuleId,
            created_at: new Date().toString(),
            updated_at: new Date().toString(),
            participantsId: []
            
        });

        // increasing the modules count in project
        var k = parseInt(module.noOfTasks)+1;
        module.noOfTasks = k.toString();
        module.noOfCompletedTasks = await Task.countDocuments({ModuleId : args.taskInput.ModuleId,status: "COMPLETED"});
        module.noOfOngoingTasks = await Task.countDocuments({ModuleId : args.taskInput.ModuleId,status: "ONGOING"});
        await module.save();
        // Done Module Change

        const result = await newTask.save();
        return {...result._doc,_id:result.id};
    },
    UpdateStatusOfTask: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        try{
            const task=await Task.findOne({_id:args.TaskId});
            task.status=args.status;
            await task.save();
            const module = await Module.findOne({_id : task.moduleId});
            module.noOfCompletedTasks = await Task.countDocuments({ModuleId : args.taskInput.ModuleId,status: "COMPLETED"});
            module.noOfOngoingTasks = await Task.countDocuments({ModuleId : args.taskInput.ModuleId,status: "ONGOING"});
            await module.save();

            // module info changing 

            // END
            return {...task._id,_id:task.id};
        }
        catch{
            throw err;
        }
    },
    GetTaskForModuleById: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        try{
            const tasks=await Task.find({ModuleId: args.moduleId});
            return tasks.map(task => {
                return {...task._doc,_id:task.id};
            });
        }
        catch{
            throw err;
        }
    },

}
