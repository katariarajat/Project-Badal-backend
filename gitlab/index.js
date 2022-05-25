
require('dotenv').config()
const { UsersApi, ProjectsApi, Config, Project, loadConfig, ProjectApi } = require('gitlab-fetch');
// console.log(process.env);
const config = {
    baseUrl: process.env.GITLAB_BASEURL,
    auth: {
      privateToken: process.env.GITLAB_PRIVATE_TOKEN,
    }
};

module.exports = {
    async createProjectGitlab(params){
        try{
            const projectsApi = new ProjectsApi(config);
            // console.log(params);
            const NewProject = await projectsApi.create(params.name,{description:params.description,initialize_with_readme:true,request_access_enabled:true,visibility: "public"});
            // console.log(NewProject);
            return NewProject;
        }
        catch(e){
            console.log(e);
        }
    },
      
}





  