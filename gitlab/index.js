// import { Gitlab } from '@gitbeaker/node'; // All Resources
// import { Projects } from '@gitbeaker/node';// Just the Project Resource

const { Gitlab } = require('@gitbeaker/node');

const api = new Gitlab({
    host : 'https://gitlab.com',
    token: 'glpat-Hfz5z5xV6x6XJtPmjBG8',
});

module.exports = {
    async yo(){
        // let projects = await api.Projects.all({maxPages:2});
        // let users = await api.Users.all();
        // console.log(users);
        let projects = await api.Projects.create();
        console.log(projects);

        
        // console.log(projects);
        // console.log(projects.length);
    }
}

  