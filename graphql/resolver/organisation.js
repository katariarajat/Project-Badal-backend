const Organisation = require('../../models/organisation');
const { errorName, usertype, errorType} = require('../../constants');
const Ngo = require('../../models/ngo');

module.exports = {
    createOrganisation: async (args,req) => {
      if(!req.isAuth)
      {
        throw new Error(errorName.UNAUTHORIZED);
      }
      if(req.userType != usertype.IIITH)
      {
        throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
      }
          try {
            const existingOrganisation = await Organisation.findOne({name: args.organisationinput.name});
            if (existingOrganisation) {
              throw new Error(errorType.ORG_ALREADY_EXISTS);
            }
            
            const organisation = new Organisation({
              name: args.organisationinput.name,
              address: args.organisationinput.address,
              phoneNumber: args.organisationinput.address,
              pincode: args.organisationinput.pincode,
              size: args.organisationinput.size,    
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

      createNgo : async (args,req) => {
      if(!req.isAuth)
      {
        throw new Error(errorName.UNAUTHORIZED);
      }
      if(req.userType != usertype.IIITH)
      {
        throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
      }
        try {
          const existingOrganisation = await Ngo.findOne({name: args.organisationinput.name});
          if (existingOrganisation) {
            throw new Error(errorType.ORG_ALREADY_EXISTS);
          }
          
          const organisation = new Ngo({
            name: args.organisationinput.name,
            address: args.organisationinput.address,
            phoneNumber: args.organisationinput.address,
            pincode: args.organisationinput.pincode,
            size: args.organisationinput.size,    
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

      GetAllOrganisations : async (args,req) => { 
        
        if(req.isAuth)
        {
          if(req.userType != 'IIITH')
          {
            throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
          }
          try {
            // console.log(req);
              let existingOrganisation = await Organisation.find({});
              let existingNgo = await Ngo.find({});
              if (!existingOrganisation || !existingNgo) {
                throw new Error(errorName.MONGO_ACCESS_ERROR);
              }
              existingOrganisation = existingOrganisation.concat(existingNgo);
              return existingOrganisation.map(existingOrganisation => {
                  return {
                  ...existingOrganisation._doc,
                  _id: existingOrganisation.id,
                };
                });
            } 
            catch (err) {
              throw err;
            }
        }
        else
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
      },

      GetNgo : async (args,req) => {
        console.log(req);
        if(!req.isAuth)
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
        if(req.userType != usertype.IIITH)
        {
          throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
        }
        try{
          
          const ngo = await Ngo.find();
          return ngo.map(ngo => {
            return {...ngo._doc,_id : ngo.id,created_at : ngo.created_at.toString(),deleted_at : ngo.deleted_at.toString(),updated_at : ngo.updated_at.toString()};
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
        if(req.userType != usertype.IIITH)
        {
          throw new Error(errorName.IIIT_CORE_ACCESS_ONLY);
        }
        try{
          const company= await Organisation.find({});
          return company.map(company => {
            return {...company._doc,_id:company.id,created_at : company.created_at.toString(),deleted_at : company.deleted_at.toString(),updated_at : company.updated_at.toString()};
          });
        }
        catch{
          throw err;
        }
      },


}