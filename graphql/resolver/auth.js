const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorName, usertype } = require('../../constants');

const User = require('../../models/user');
const Organisation = require('../../models/organisation');

module.exports = {

  login: async ({ email, password }) => {
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error(errorName.USER_DO_NOT_EXISTS);
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error(errorName.USER_DO_NOT_EXISTS);
    }
    var orgid;
    console.log(user);
    if (user.type == usertype.CORE) {
      orgid = user.coreId;
    }
    else if (user.type == usertype.COMP) {
      orgid = user.orgId;
    }
    else {
      orgid = user.ngoId;
    }
    
    console.log({ userId: user.id, email: user.email, userType: user.type, isAdmin: user.isAdmin, orgId: orgid });
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.type, isAdmin: user.isAdmin, orgId: orgid },
      'ProjectBadal',
      {
        expiresIn: '1h'
      }
    );
    console.log(token, user.id);
    return { userId: user.id, token: token, tokenExpiration: 1, userRole : user.type, teamId : user.teamId};
  }
};
