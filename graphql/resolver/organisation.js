const Organisation = require('../../models/organisation');

module.exports = {
    createOrganisation: async args => {
        try {
          const existingOrganisation = await Organisation.findOne({email: args.organisationinput.email});
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
            deleted_at: null
          });
    
          const result = await organisation.save();
    
          return { ...result._doc, _id: result.id };
        } catch (err) {
          throw err;
        }
      },

      organisations : () => {
        try {
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
      },

}