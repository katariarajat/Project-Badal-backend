const authResolver = require('./auth');
const organisationResolver = require('./organisation');
const projectsResolver = require('./project');

const rootResolver = {
  ...authResolver,
  ...organisationResolver,
  ...projectsResolver
};

module.exports = rootResolver;