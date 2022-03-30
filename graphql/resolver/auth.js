const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {errorName,usertype} = require('../../constants');

const User = require('../../models/user');
const Organisation = require('../../models/organisation');

module.exports = {
    createUser: async args => {
      
      try {
        const existingUser = await User.findOne({ email: args.userinput.email });
        if (existingUser) {
          throw new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(args.userinput.password, 12);
        let organisation;
               
        
        const user = new User({
          email: args.userinput.email,
          password: hashedPassword,
          name: args.userinput.name,
          contact: args.userinput.contact,
          address: args.userinput.address,
          pincode: args.userinput.pincode,
          type: args.userinput.type,
          created_at: new Date().toString(),
          organisationId: args.userinput.organisationId,
          iscore: args.userinput.iscore,
        });
  
        const result = await user.save();
  
        return { ...result._doc, password: null, _id: result.id };
      } catch (err) {
        throw err;
      }
    },
    login: async ({ email, password }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error(errorName.USER_DO_NOT_EXISTS);
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error(errorName.USER_DO_NOT_EXISTS);
      }
      let orgid;
      if(user.type == usertype.IIITH || user.type == usertype.COMP)
      {
        orgid = user.orgId;
      }
      else 
      {
        orgid = user.ngoId;
      }
      console.log(orgid);
      const token = jwt.sign(
        {userId: user.id, email: user.email, userType: user.type, orgId : orgid },
        'ProjectBadal',
        {
          expiresIn: '1h'
        }
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
    }
  };