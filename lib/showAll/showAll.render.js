const camelCase = require('lodash.camelcase');
const get = require('lodash.get');

const utilities = require('./../utilities');
const showRender = require('./../show/show.render');

module.exports.method = (Model, modelPath, template, opts = {}) => {
  opts.modelWrapper = get(opts, 'modelWrapper', utilities.pluralize(camelCase(Model.modelName)));
  return showRender.method(Model, modelPath, template, opts);
};