const SkillTags = require('../../models/skills');
const {errorName,usertype} = require('../../constants');

module.exports = {
    GlobalSkillAdd : async (args,req) => {
        console.log(args);
        if(!req.isAuth){
            throw new Error(errorName.UNAUTHORIZED);
        }
        if(req.userType != usertype.CORE){
            throw new Error(errorName.IIIT_CORE_ACCESS_ONLY)
        }
        try{
            for(let i=0;i<args.skills.length;i++)
            {
                const skill = await SkillTags.findOne({skill : args.skills[i]});

                if(skill)
                {
                    continue;
                }

                const skill_new = await SkillTags({
                    skill : args.skills[i],
                });

                const result = await skill_new.save();
                console.log(result);
            }
            const Skills = await SkillTags.find({});
            return Skills.map(skill => {
                return {...skill._doc,_id : skill.id}
            });
        }
        catch{
            throw err;
        }
    },
    GetSkills : async (args,req) => {
        if(!req.isAuth){
            throw new Error(errorName.UNAUTHORIZED);
        }
        const skills = await SkillTags.find();
        return skills.map(skill => {
            return {...skill._doc,_id:skill.id};
        });
    },
    GlobalSkillRemove : async (args,req) => {
        if(!req.isAuth){
            throw new Error(errorName.UNAUTHORIZED);
        }
        if(req.userType != usertype.CORE){
            throw new Error(errorName.IIIT_CORE_ACCESS_ONLY)
        }
        console.log(args.skills);
        try{
            for(let i=0;i<args.skills.length;i++)
            {
                const skill = await SkillTags.deleteOne({skill : args.skills[i]});
            }
            const Skills = await SkillTags.find({});
            return Skills.map(skill => {
                return {...skill._doc,_id : skill.id}
            });
        }
        catch{
            throw err;
        }
    }
}