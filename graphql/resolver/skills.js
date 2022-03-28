const SkillTags = require('../../models/skills');
const {errorName,usertype} = require('../../constants');

module.exports = {
    GlobalSkillAdd : async (args,req) => {
        console.log(args);
        if(!req.isAuth){
            throw new Error(errorName.UNAUTHORIZED);
        }
        if(req.userType != usertype.IIITH){
            throw new Error(errorName.IIIT_CORE_ACCESS_ONLY)
        }
        try{
            console.log(args.skills);
            for(let i=0;i<args.skills.length;i++)
            {
                const skill = await SkillTags.findOne({skill : args.skills[i].skill});

                if(skill)
                {
                    continue;
                }

                const skill_new = await SkillTags({
                    skill : args.skills[i].skill,
                    user : (args.skills[i].user)?args.skills[i].user:0,
                    project: args.skills[i].project?args.skills[i].project:0,
                });

                const result = await skill_new.save();
                console.log(result);
            }
            const Skills = await SkillTags.find({});
            console.log(Skills);
            return Skills.map(skill => {
                return {...skill._doc,_id : skill.id}
            });
        }
        catch{
            throw err;
        }
    },
    GetSkillForUser : async (args,req) => {
        if(!req.isAuth){
            throw new Error(errorName.UNAUTHORIZED);
        }
        const skills = await SkillTags.find({user : 1});
        return skills.map(skill => {
            return {...skill._doc,_id:skill.id};
        });
    },
    GetSkillForProject : async (args,req) => {
        if(!req.isAuth){
            throw new Error(errorName.UNAUTHORIZED);
        }
        const skills = await SkillTags.find({project : 1});
        return skills.map(skill => {
            return {...skill._doc,_id:skill.id};
        });
    }, 
}