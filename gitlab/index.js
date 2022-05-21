// import { Gitlab } from '@gitbeaker/node'; // All Resources
// import { Projects } from '@gitbeaker/node';// Just the Project Resource

// const { Gitlab } = require('@gitbeaker/node');
const { UsersApi, ProjectsApi, Config, Project, loadConfig, ProjectApi } = require('gitlab-fetch');

// const api = new Gitlab({
//     host : 'https://gitlab.com/',
//     token: 'glpat-Hfz5z5xV6x6XJtPmjBG8',
// });
const config = {
    baseUrl: 'https://gitlab.com/api',
    auth: {
      privateToken: 'glpat-Hfz5z5xV6x6XJtPmjBG8',
    }
};

module.exports = {
    async createProjectGitlab(params){
        try{
            const projectsApi = new ProjectsApi(config);
            const NewProject = await projectsApi.create(params.name,{description:params.description,initialize_with_readme:true,request_access_enabled:true,visibility: "public"});
            console.log(NewProject);
            return NewProject;
        }
        catch(e){
            console.log(e);
        }
    },
      
}





  