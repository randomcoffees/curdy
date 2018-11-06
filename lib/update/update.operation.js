const get = require('lodash.get');
const merge = require('lodash.merge');
const jyson = require('jyson');

const utilities = require('../utilities');

function markArraysAsModified(model, templateResult, path = []) {
  for (const key in templateResult) {
    const pathString = path.concat([key]).join('.');
    if (Array.isArray(get(model, pathString))) {
      model.markModified(pathString);
    }

    if (typeof get(model, pathString) === 'object') {
      markArraysAsModified(model, templateResult[key], path.concat([key]));
    }
  }
}

// This is so that a plugin can extend this method
module.exports.merge = (model, templateResult) => {
  merge(model, templateResult);
  markArraysAsModified(model, templateResult);
};

module.exports.method = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template, { undefinedValue: undefined });

  return (req, res, next) => {
    const model = get(req, modelPath);
    const templateResult = templateFunction(req);

    module.exports.merge(model, templateResult);

    return utilities.when(model.save())
    .then(() => next(), next);
  };
};