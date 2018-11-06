const get = require('lodash.get');

const showRender = require('./../show/show.render');

module.exports.method = (Model, modelPath, template, opts = {}) => {
  opts.statusCode = get(opts, 'statusCode', 201);
  return showRender.method(Model, modelPath, template, opts);
};