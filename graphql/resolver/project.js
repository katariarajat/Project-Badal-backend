const req = require('express/lib/request');
const Project = require('../../models/project');
const {errorName, usertype} = require('../../constants');
const Organisation = require('../../models/organisation')
const ModuleTeam = require('../../models/moduleTeam');
const Module = require('../../models/module');
const { createProjectGitlab } = require('../../gitlab/index');
const {storeFile } = require('../../index');
module.exports = {
    GetAllProjects : async function(args,req){
      if(!req.isAuth)
      {
          throw new Error(errorName.UNAUTHORIZED);
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

    createProject: async (args,req) => {
      // console.log("KEYCHECK 1");
      
      if(!req.isAuth)
      {
        throw new Error(errorName.UNAUTHORIZED);
      }
      if( req.userType == usertype.NGO && req.orgId != args.projectinput.ngoId && args.projectinput.ngoId!=null)
      {
        throw new Error("Not Authorized to create Project")
      }
      
      if(req.isAdmin == "NO")
      {
        throw new Error("ONLY ADMIN CAN ADD PROJECT");
      }
      const ifproject = await Project.findOne({name : args.projectinput.name});
      
      if(ifproject)
      {
        throw new Error("Project Already exists.");
      }
        try {

          const gitlabProject = await createProjectGitlab(args.projectinput);
          var gitlabProjectId,ssh_url_to_repo,http_url_to_repo,web_url;
          if(gitlabProject)
          {
            gitlabProjectId = gitlabProject.id;
            ssh_url_to_repo = gitlabProject.ssh_url_to_repo;
            http_url_to_repo = gitlabProject.http_url_to_repo;
            web_url = gitlabProject.web_url;
          }
          
          if(gitlabProject)
          var ngoId = (args.projectinput.ngoId)?args.projectinput.ngoId:req.orgId;
          const project = new Project({
            name : args.projectinput.name,
            description:args.projectinput.description,
            problem_statement:args.projectinput.problem_statement,
            fileUrl:args.projectinput.fileUrl,
            domain:args.projectinput.domain,
            created_at:new Date().toString(),
            updated_at : new Date().toString(),
            deleted_at : null,
            ngoId : ngoId,
            status : "ONGOING",
            progress : "0",
            tags : args.projectinput.tags,
            noOfModules : "0",
            gitlabProjectId : gitlabProjectId,
            ssh_url_to_repo : ssh_url_to_repo,
            http_url_to_repo : http_url_to_repo,
            web_url : web_url,
          });
    
          const result = await project.save();
    
          return { ...result._doc, _id: result.id };
        } catch (err) {
          throw err;
        }
      },
      GetProjectForNgoByNgoId: async (args,req) => {
        try
        {
          const project = await Project.find({ngoId : args.ngoId});
          console.log(project);
          return project.map(project => {
            return {...project._doc,_id:project.id};
          })
        }
        catch
        {
          return new Error("Couldn't execute query GetProjectForNgoByNgoId");
        }
      },
      UpdateStatusOfProject: async (args,req) =>{
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
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

