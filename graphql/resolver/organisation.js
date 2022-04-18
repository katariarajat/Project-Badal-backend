const Organisation = require('../../models/organisation');
const { errorName, usertype, errorType} = require('../../constants');
const Ngo = require('../../models/ngo');
const User = require('../../models/user');
const {makePassword} = require('../../GlobalFunction');
const bcrypt = require('bcryptjs');

module.exports = {
    createOrganisation: async (args,req) => {
      if(!req.isAuth)
      {
        throw new Error(errorName.UNAUTHORIZED);
      }
      if(req.userType != usertype.CORE)
      {
        throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
      }
      const existingOrganisation = await Organisation.findOne({email : args.organisationinput.email});

      if (existingOrganisation) {
        throw new Error(errorType.ORG_ALREADY_EXISTS);
      }

      const userold = await User.findOne({email: args.organisationinput.email});
      if(userold)
      {
        throw new Error("User Already exists with this email. PLease change the email.")
      }
      const organisation = new Organisation({
        name: args.organisationinput.name,
        email : args.organisationinput.email,
        address: args.organisationinput.address,
        phoneNumber: args.organisationinput.phoneNumber,
        pincode: args.organisationinput.pincode,
        size : "1",
        company_description: args.organisationinput.company_description,
        urlWebsite : args.organisationinput.urlWebsite,
        created_at: new Date().toString(),      
        updated_at: new Date().toString(),
        deleted_at: null,
        tags : args.organisationinput.tags, 
      });

      const result = await organisation.save();
      console.log(args);

      var password = makePassword(10);
      const hashedPassword = await bcrypt.hash(password, 12);
      var orgId,coreId,ngoId;
      if(req.userType == usertype.CORE)
      { 
        coreId = req.orgId;
      }
      else if(req.userType == usertype.COMP)
      {
        orgId = req.orgId;
      }
      else if(req.userType == usertype.NGO)
      {
        ngoId = req.orgId;
      }
      const user = new User({
        email: args.organisationinput.email,
        password: hashedPassword,
        name: "Admin"+args.organisationinput.name,
        address: args.organisationinput.address,
        pincode: args.organisationinput.pincode,
        type: req.userType,
        created_at: new Date().toString(),
        orgId : orgId,
        coreId : coreId,
        ngoId : ngoId,
        isAdmin : "YES",
        });
      const result_user = await user.save();
      console.log(result_user)
      return { ...result._doc, password : password,_id: result.id };
      },
      
      createNgo : async (args,req) => {
      if(!req.isAuth)
      {
        throw new Error(errorName.UNAUTHORIZED);
      }
      if(req.userType != usertype.CORE)
      {
        throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
      }
      const existingOrganisation = await Ngo.findOne({email: args.organisationinput.email});
      if (existingOrganisation) {
        throw new Error(errorType.ORG_ALREADY_EXISTS);
      }
        try {
          
          const organisation = new Ngo({
            name: args.organisationinput.name,
            email: args.organisationinput.email,
            address: args.organisationinput.address,
            phoneNumber: args.organisationinput.address,
            pincode: args.organisationinput.pincode,
            size : "",
            company_description: args.organisationinput.company_description,
            urlWebsite : args.organisationinput.urlWebsite,
            created_at: new Date(),      
            updated_at: new Date(),
            deleted_at: null,
            tags : args.organisationinput.tags, 
          });
    
          const result = await organisation.save();
    
          return { ...result._doc, _id: result.id };
        } catch (err) {
          throw err;
        }
      },  
      createCore : async (args,req) => {
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        if(req.userType != usertype.CORE)
        {
          throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
        }
        const existingOrganisation = await Core.findOne({email: args.organisationinput.email});
        if (existingOrganisation) {
          throw new Error(errorType.ORG_ALREADY_EXISTS);
        }
        try {
            const organisation = new Core({
              name: args.organisationinput.name,
              email : args.organisationinput.email,
              address: args.organisationinput.address,
              phoneNumber: args.organisationinput.address,
              pincode: args.organisationinput.pincode,
              size : "",
              company_description: args.organisationinput.company_description,
              urlWebsite : args.organisationinput.urlWebsite,
              created_at: new Date().toString(),      
              updated_at: new Date().toString(),
              deleted_at: null,
              tags : args.organisationinput.tags, 
            });
            const result = await organisation.save();
            return { ...result._doc, _id: result.id };
          } catch (err) {
            throw err;
          }
        },
      GetNgo : async (args,req) => {
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        try{
          const ngo = await Ngo.find({});
          return ngo.map(ngo => {
            return {...ngo._doc,_id : ngo.id};
          });
        }
        catch{
          throw err;
        }
      },

      GetCompany : async (args,req) => {
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        try{
          const company= await Organisation.find({});
          return company.map(company => {
            return {...company._doc,_id:company.id};
          });
        }
        catch{
          throw err;
        }
      },
      GetEmployeeForCompany : async (args,req) => {
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        if(req.userType != usertype.CORE && req.orgId != args.companyId)
        {
          throw new Error("ACCESS DENIED");
        }
        try{
          const users = await User.find({orgId : args.orgId}).populate("orgId").populate("coreId").populate("ngoId");
          console.log(users);
          return users.map(user => {
            return {...user._doc,_id:user.id};
          });
        }
        catch{
          throw err;
        }
      }
}