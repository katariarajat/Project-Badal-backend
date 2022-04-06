const Organisation = require('../../models/organisation');
const { errorName, usertype, errorType} = require('../../constants');
const Ngo = require('../../models/ngo');
const User = require('../../models/user');

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
          try {
            const organisation = new Organisation({
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
      // GetAllOrganisations : async (args,req) => { 
        
      //   if(req.isAuth)
      //   {
      //     if(req.userType != 'IIITH')
      //     {
      //       throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
      //     }
      //     try {
      //       // console.log(req);
      //         let existingOrganisation = await Organisation.find({});
      //         let existingNgo = await Ngo.find({});
      //         if (!existingOrganisation || !existingNgo) {
      //           throw new Error(errorName.MONGO_ACCESS_ERROR);
      //         }
      //         existingOrganisation = existingOrganisation.concat(existingNgo);
      //         return existingOrganisation.map(existingOrganisation => {
      //             return {
      //             ...existingOrganisation._doc,
      //             _id: existingOrganisation.id,
      //           };
      //           });
      //       } 
      //       catch (err) {
      //         throw err;
      //       }
      //   }
      //   else
      //   {
      //     throw new Error(errorName.UNAUTHORIZED);
      //   }
      // },

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
}