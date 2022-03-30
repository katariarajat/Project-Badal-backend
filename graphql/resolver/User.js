const User = require('../../models/user');
const {errorName, usertype} = require('../../constants');
const req = require('express/lib/request');



module.exports = {
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
        if(req.orgId != user.orgId)
        {
            throw new Error("User Does not belong to your organisation");
        }
        user.organisationId = "";
        let result = await user.save();
        return {...result._doc, _id: result.id};
    }
}