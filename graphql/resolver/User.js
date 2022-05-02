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
            const org = await Organisation.findOne({_id : orgId});
            var k = parseInt(org.size)+1;
            org.size = k.toString();
            await org.save();
        }
        if(req.userType == usertype.CORE)
        {
            coreId = req.orgId;
            const org = await Core.findOne({_id : coreId});
            console.log(org);
            var k = parseInt(org.size)+1;
            org.size = k.toString();
            await org.save();
        }
        if(req.userType == usertype.NGO)
        {
            ngoId = req.orgId;
            const org = await Ngo.findOne({_id : ngoId});
            var k = parseInt(org.size)+1;
            org.size = k.toString();
            await org.save();
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
    
}