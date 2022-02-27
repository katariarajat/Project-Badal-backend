const Project = require('../../models/Projects');

module.exports = {
    projects : async function(){
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

    createProject: async args => {
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
            organisationId: args.projectinput.organisationId,
          });
    
          const result = await project.save();
    
          return { ...result._doc, _id: result.id };
        } catch (err) {
          throw err;
        }
      },
    
}

