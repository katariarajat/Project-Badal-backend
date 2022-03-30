const req = require('express/lib/request');
const Project = require('../../models/project');
const {errorName, usertype} = require('../../constants');
const Organisation = require('../../models/organisation')
const ModuleTeam = require('../../models/moduleTeam');
module.exports = {
    GetAllProjects : async function(args,req){
      if(!req.isAuth)
      {
          throw new Error(errorName.UNAUTHORIZED);
      }
      if(req.userType != usertype.IIITH)
      {
          throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
      }
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

    CreateProject: async (args,req) => {
      if(!req.isAuth)
      {
        throw new Error(errorName.UNAUTHORIZED);
      }
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
            NGOId: req.orgId,
            status:args.projectinput.status,
            tags : args.projectinput.tags,
          });
    
          const result = await project.save();
    
          return { ...result._doc, _id: result.id };
        } catch (err) {
          throw err;
        }
      },
      UpdateStatusOfProject: async (args,req) =>{
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        if(!(args.projectId == req.orgId || req.userType == usertype.IIITH))
        {
          throw new Error("Project Does not belong to you.");
        }
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
      MyProjects: async (args,req)=> {
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        try{
          const NgoProjects=await Project.find({NGOId:req.orgId});
        return NgoProjects.map(NgoProjects => {
          return {...NgoProjects._doc,_id:NgoProjects.id};
        });
        }
        catch{
          throw err;
        }
      },
      GetProjectsForCompanies: async (args,req) => {
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        try{
          const Projects = await ModuleTeam.find({orgId: args.orgId});
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

