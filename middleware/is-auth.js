const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  // console.log(authHeader);
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'ProjectBadal');
    // console.log(decodedToken);
  } catch (err) {
    req.isAuth = false;
    // console.log('hello');

    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  req.userType = decodedToken.userType;
  req.orgId = decodedToken.orgId;
  req.isAdmin = decodedToken.isAdmin;
  console.log(decodedToken);
  next();
};