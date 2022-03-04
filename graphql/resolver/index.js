const authResolver = require('./auth');
const organisationResolver = require('./organisation');
const projectsResolver = require('./project');
const moduleResolver = require('./module');
const teamResolver = require('./team');
const rootResolver = {
  ...authResolver,
  ...organisationResolver,
  ...projectsResolver,
  ...teamResolver,
  ...moduleResolver
};

module.exports = rootResolver;