const req = require('express/lib/request');
const Organisation = require('../../models/organisation');
const { errorName} = require('../../constants');

module.exports = {
    createOrganisation: async (args,req) => {
        console.log(req);
        if(req.isAuth)
        {
          try {
            const existingOrganisation = await Organisation.findOne({name: args.organisationinput.name});
            if (existingOrganisation) {
              throw new Error('Organisation exists already.');
            }
            
            const organisation = new Organisation({
              email: args.organisationinput.email,
              name: args.organisationinput.name,
              address: args.organisationinput.address,
              pincode: args.organisationinput.pincode,
              contact: args.organisationinput.contact,
              size: args.organisationinput.size,    
              company_description: args.organisationinput.company_description,
              urlWebsite : args.organisationinput.urlWebsite,
              created_at: new Date().toString(),      
              updated_at: new Date().toString(),
              deleted_at: null,
              type: args.organisationinput.type,
            });
      
            const result = await organisation.save();
      
            return { ...result._doc, _id: result.id };
          } catch (err) {
            throw err;
          }
        }
        else{
          throw new Error(errorName.UNAUTHORIZED)
        }
        
      },

      GetAllOrganisations : async (args,req) => { 
        console.log(req);
        if(req.isAuth)
        {
          try {
            console.log(req);
              const existingOrganisation = await Organisation.find({});
              if (!existingOrganisation) {
                throw new Error('No organisations Registered');
              }
              return existingOrganisation.map(existingOrganisation => {
                  return {
                  ...existingOrganisation._doc,
                  _id: existingOrganisation.id,
                };
                });
            } catch (err) {
              throw err;
            }
        }
        else
        {
          throw new Error(errorName.UNAUTHORIZED);
        }
      },
      GetNgo:async () => {
        try{
          const ngo = await Organisation.find({type : "NGO"});
          return Organisation.map(organisation => {
            return {...organisation._doc,_id : organisation.id};
          });
        }
        catch{
          throw err;
        }
      },
      GetCompany : async () => {
        try{
          const company= await Organisation.find({type: "COMP"});
          return company.map(company => {
            return {...company._doc,_id:company.id};
          });
        }
        catch{
          throw err;
        }
      },


}