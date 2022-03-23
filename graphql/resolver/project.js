const Project = require('../../models/project');

module.exports = {
    GetAllProjects : async function(){
        try {
            const existingprojects = await Project.find({});
            if (!existingprojects) {
              throw new Error('No Project Added');
            }
            return existingprojects.map(existingprojects => {
                return {
                ...existingprojects._doc,
                _id: existingprojects.id,
              };
              });
          } catch (err) {
            throw err;
          }
    },

    CreateProject: async args => {
        try {
          const project = new Project({
            name : args.projectinput.name,
            brief:args.projectinput.brief,
            problem_statement:args.projectinput.problem_statement,
            fileUrl:args.projectinput.fileUrl,
            domain:args.projectinput.domain,
            created_at:new Date().toString(),
            updated_at : new Date().toString(),
            deleted_at : null,
            NGOId: args.projectinput.NGOId,
            status:args.projectinput.status,
          });
    
          const result = await project.save();
    
          return { ...result._doc, _id: result.id };
        } catch (err) {
          throw err;
        }
      },
      UpdateStatusOfProject: async (args) =>{
        try
        {
          const project = await Project.findOne({_id:args.projectId});
          // console.log(project)
          if(!project)
          {
            throw new Error("Project Not Found");
          }
          project.status=args.status;
          project.updated_at=new Date().toString();
          const result=await project.save();
          
          return {...result._doc,_id:result.id};

        }
        catch
        {
          return new Error("Couldn't change Status");
        }
        
      },
      MyProjects: async (args)=> {
        try{
          const NgoProjects=await Project.find({NGOId:args.NGOId});
        return NgoProjects.map(NgoProjects => {
          return {...NgoProjects._doc,_id:NgoProjects.id};
        });
        }
        catch{
          throw err;
        }
      },
      GetProjectsForCompanies: async (args) => {
        try{
          const Projects = await Project.find({companies : args.comapnyId});
          return Projects.map(project => {
            return {...project._doc,
               _id:project.id}
          });
        }
        catch{
          throw err;
        }
      }
}

