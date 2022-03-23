const User = require('../../models/user');

module.exports = {
    AddEmployeeToCompany: async (args) => {
        let user = await User.findOne({_id : args.employeeId});
        user.organisationId = args.companyId;
        let result = await user.save();
        return {...result._doc, _id: result.id};
    },
    RemoveEmployeeFromCompany: async (args) => {
        let user = await User.findOne({_id : args.employeeId});
        user.organisationId = "";
        let result = await user.save();
        return {...result._doc, _id: result.id};
    }
}