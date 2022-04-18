const User = require('../../models/user');
const {errorName, usertype,usertypeName} = require('../../constants');
const bcrypt = require('bcryptjs');
const Organisation = require('../../models/organisation');
const Core = require('../../models/core');
const Ngo = require('../../models/ngo');
const {makePassword} = require('../../GlobalFunction');

module.exports = {
    createUser: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        if(req.isAdmin == "NO")
        {
            throw new Error(errorName.ADMIN_ACCESS_ONLY);
        }
        const existingUser = await User.findOne({ email: args.userinput.email });
        if (existingUser) {
            throw new Error(errorName.ALREADY_EXIST);
        }
        var password = makePassword(10);
        const hashedPassword = await bcrypt.hash(password, 12);

        var orgId,coreId,ngoId;
        if(req.userType == usertype.COMP)
        {
            orgId = req.orgId;
        }
        if(req.userType == usertype.CORE)
        {
            coreId = req.orgId;
        }
        if(req.userType == usertype.NGO)
        {
            ngoId = req.orgId;
        }
        var isAdmin = (req.userType == usertype.CORE)?"YES":args.userinput.isAdmin;
        const user = new User({
        email: args.userinput.email,
        password: hashedPassword,
        name: args.userinput.name,
        address: args.userinput.address,
        phoneNumber : args.userinput.phoneNumber,
        type: req.userType,
        created_at: new Date().toString(),
        orgId : orgId,
        coreId : coreId,
        ngoId : ngoId,
        isAdmin : isAdmin,
        skill : args.userinput.skill
        });
    
        const result = await user.save();
        const finaluser = await User.findOne({_id:result.id}).populate("orgId").populate("coreId").populate("ngoId").populate("skill");
        return { ...finaluser._doc, _id: finaluser.id, password: password };
      },
      GetUserData : async (args,req) => {
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        try{
            const user = await User.findOne({_id : req.userId}).populate("ngoId").populate("orgId").populate("coreId");
            return {
                ...user._doc, _id : user.id, password : null
            }
        }
        catch {
            throw err;
        }
        
      },
      createUserForOrgByCore: async (args,req) => {
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        if(req.userType != usertype.CORE)
        {
          throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
        }
        if(!usertypeName.includes(args.userinput.utype))
        {
            throw new Error("Type can be COMP,NGO,CORE")
        }
        
        const existingUser = await User.findOne({ email: args.userinput.email });
        if (existingUser) {
            throw new Error(errorName.ALREADY_EXIST);
        }
        const hashedPassword = await bcrypt.hash(args.userinput.password, 12);
        let orgId,coreId,ngoId;
        let isAdmin = "NO";
        if(args.userinput.type == usertype.COMP)
        {
            orgId = args.userinput.orgId;
            isAdmin = args.userinput.isAdmin;
            const org = await Organisation.findOne({_id : args.userinput.orgId});
            if(!org)
            {
                throw new Error("Organisation Does not exists");
            }
            else 
            {
                var size = parseInt(org.size)+1;
                org.size = size.toString();
                await org.save();               
            }
        }
        if(args.userinput.type == usertype.CORE)
        {
            coreId = args.userinput.orgId;
            isAdmin = "YES";
            const org = await Core.findOne({_id : args.userinput.coreId});
            if(!org)
            {
                throw new Error("Organisation Does not exists");
            }
            else 
            {
                var size = parseInt(org.size)+1;
                org.size = size.toString();
                await org.save();               
            }
        }
        if(args.userinput.type == usertype.NGO)
        {
            ngoId = args.userinput.orgId;
            isAdmin = args.userinput.isAdmin;
            const org = await Ngo.findOne({_id : args.userinput.ngoId});
            if(!org)
            {
                throw new Error("Organisation Does not exists");
            }
            else 
            {
                var size = parseInt(org.size)+1;
                org.size = size.toString();
                await org.save();               
            }
        }
        const user = new User({
        email: args.userinput.email,
        password: hashedPassword,
        name: args.userinput.name,
        address: args.userinput.address,
        pincode: args.userinput.pincode,
        type: args.userinput.utype,
        created_at: new Date().toString(),
        orgId : orgId,
        coreId : coreId,
        ngoId : ngoId,
        isAdmin : isAdmin,
        });
    
        const result = await user.save();
        console.log(result);
          return { ...result._doc, password: null, _id: result.id };
      },
}