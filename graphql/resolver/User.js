const User = require('../../models/user');
const {errorName, usertype,usertypeName} = require('../../constants');
const bcrypt = require('bcryptjs');
const Organisation = require('../../models/organisation');
const Core = require('../../models/core');
const Ngo = require('../../models/ngo');

module.exports = {
    createUser: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        console.log(req);
        if(req.isAdmin == "NO")
        {
            throw new Error(errorName.ADMIN_ACCESS_ONLY);
        }
        const existingUser = await User.findOne({ email: args.userinput.email });
        console.log(existingUser);
        if (existingUser) {
            throw new Error(errorName.ALREADY_EXIST);
        }
        const hashedPassword = await bcrypt.hash(args.userinput.password, 12);

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
        pincode: args.userinput.pincode,
        type: req.userType,
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
        if(args.userinput.utype == usertype.COMP)
        {
            orgId = args.userinput.orgId;
            isAdmin = args.userinput.isAdmin;
            const org = await Organisation.findOne({_id : args.userinput.orgId});
            if(!org)
            {
                throw new Error("Organisation Does not exists");
            }

        }
        if(args.userinput.utype == usertype.CORE)
        {
            coreId = args.userinput.orgId;
            isAdmin = "YES";
            const org = await Core.findOne({_id : args.userinput.orgId});
            if(!org)
            {
                throw new Error("Organisation Does not exists");
            }
        }
        if(args.userinput.utype == usertype.NGO)
        {
            ngoId = args.userinput.orgId;
            isAdmin = args.userinput.isAdmin;
            const org = await Ngo.findOne({_id : args.userinput.orgId});
            if(!org)
            {
                throw new Error("Organisation Does not exists");
            }
        }
        console.log(coreId,ngoId,orgId);
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


    AddEmployeeToCompany: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        let user = await User.findOne({_id : args.employeeId});
        if(user.organisationId != null)
        {
            throw new Error("User already a member of other company.");
        }
        user.organisationId = args.companyId;
        let result = await user.save();
        return {...result._doc, _id: result.id};
    },
    RemoveEmployeeFromCompany: async (args,req) => {
        if(!req.isAuth)
        {
            throw new Error(errorName.UNAUTHORIZED);
        }
        let user = await User.findOne({_id : args.employeeId});
        if(req.orgId != user.orgId && req.userType != usertype.IIITH)
        {
            throw new Error("User Does not belong to your organisation");
        }
        user.organisationId = "";
        let result = await user.save();
        return {...result._doc, _id: result.id};
    }
}