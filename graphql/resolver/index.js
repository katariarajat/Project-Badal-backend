const authResolver = require('./auth');
const organisationResolver = require('./organisation');
const projectsResolver = require('./project');

const rootResolver = {
  ...authResolver,
  ...organisationResolver,
  ...bookingResolver
};

module.exports = rootResolver;