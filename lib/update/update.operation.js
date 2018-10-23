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

module.exports.method = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template, { undefinedValue: undefined });

  return (req, res, next) => {
    const model = get(req, modelPath);
    const templateResult = templateFunction(req);

    merge(model, templateResult);
    markArraysAsModified(model, templateResult);

    return utilities.when(model.save())
    .then(() => next(), next);
  };
};