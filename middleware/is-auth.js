const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    // throw Error("Not authenticated");
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    // throw Error("Not authenticated");
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretkey');
  } catch (err) {
    req.isAuth = false;
    // throw Error("Not authenticated");
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    // throw Error("Not authenticated");
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};