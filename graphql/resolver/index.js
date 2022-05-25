const authResolver = require('./auth');
const organisationResolver = require('./organisation');
const projectsResolver = require('./project');
const moduleResolver = require('./module');
const teamResolver = require('./team');
const taskResolver = require("./task");
const skillResolver = require("./skills");
const userResolver = require("./User");
const minioResolver = require("./minio");

const rootResolver = {
  ...authResolver,
  ...organisationResolver,
  ...projectsResolver,
  ...teamResolver,
  ...moduleResolver,
  ...taskResolver,
  ...skillResolver,
  ...userResolver,
  ...minioResolver,
};

module.exports = rootResolver;