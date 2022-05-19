const Task = require("../../models/task");
const Module = require("../../models/module");
const {errorName,errorType} = require("../../constants");
const req = require("express/lib/request");
const ModuleTeam  = require("../../models/moduleTeam");

async function returnTask(taskId){
    const task = await Task.findOne({_id : taskId}).populate("assigned_to");
    return {
        ...task._doc,
        _id:task.id
    };
}

module.exports = {
    AddTaskToModuleById: async (args,req) => {

        if(!req.isAuth)
        {
            throw new Error(errorName.DO_NOT_EXIST);
        }
        // console.log(args);
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

        // increasing the Task count in Module
        var k = parseInt(module.noOfTasks)+1;
        module.noOfTasks = k.toString();

        module.noOfCompletedTasks = await Task.countDocuments({ModuleId : args.taskInput.ModuleId,status: "COMPLETED"});
        module.noOfOngoingTasks = await Task.countDocuments({ModuleId : args.taskInput.ModuleId,status: "ONGOING"});
        module.noOfOngoingTasks = (parseInt(module.noOfOngoingTasks)+1).toString()
        await module.save();
        // Done Module Change

        const result = await newTask.save();
        return {...result._doc,_id:result.id};
    },
    UpdateStatusOfTask: async (args,req) => {
        console.log(args);
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        try{
            
            const task=await Task.findOne({_id:args.TaskId});
            task.status=args.status;
            const result = await task.save();

            const module = await Module.findOne({_id : task.ModuleId});
            var k = (await Task.countDocuments({ModuleId : task.ModuleId,status: "COMPLETED"})).toString()
            module.noOfCompletedTasks = k;
            module.noOfOngoingTasks = (await Task.countDocuments({ModuleId : task.ModuleId,status: "ONGOING"})).toString();
            await module.save();
            // module info changing
            // END
            return returnTask(result.id);
            // return {...result._id,_id:result.id};
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
                return returnTask(task.id);
            });
        }
        catch{
            throw err;
        }
    },
    AssignTaskToUser : async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        const task = await Task.findOne({_id : args.taskId});
        task.assigned_to = args.UserId;
        const result = await task.save();
        return returnTask(result.id);
    }

}
