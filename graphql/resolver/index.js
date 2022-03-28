const authResolver = require('./auth');
const organisationResolver = require('./organisation');
const projectsResolver = require('./project');
const moduleResolver = require('./module');
const teamResolver = require('./team');
const taskResolver = require("./task");
const skillResolver = require("./skills");

const rootResolver = {
  ...authResolver,
  ...organisationResolver,
  ...projectsResolver,
  ...teamResolver,
  ...moduleResolver,
  ...taskResolver,
  ...skillResolver,
};

module.exports = rootResolver;