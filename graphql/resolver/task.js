const Task = require("../../models/task");
const Module = require("../../models/module");
module.exports = {
    AddTaskToModuleById: async (args) => {
        
        const module=await Module.findOne({_id: args.taskInput.ModuleId});
        console.log(module);
        if(!module)
        {
            throw Error("Module do not exits");
        }
        const newTask = new Task({
            name: args.taskInput.name,
            brief: args.taskInput.brief,
            assigned_to: null,
            ModuleId: args.taskInput.ModuleId,
            created_at: new Date().toString(),
            updated_at: new Date().toString(),
            participantsId: []
        });
        const result = await newTask.save();
        return {...result._doc,_id:result.id};
    },
    UpdateStatusOfTask: async (args) => {
        try{
            const task=await Task.findOne({_id:args.TaskId});
            task.status=args.status;
            return {...task._id,_id:task.id};
        }
        catch{
            throw err;
        }
    },
    GetTaskForModuleById: async (args) => {
        try{
            const tasks=await Task.find({_id: args.moduleId});
            return tasks.map(task => {
                return {...task._doc,_id:task.id};
            });
        }
        catch{
            throw err;
        }
    },

}
