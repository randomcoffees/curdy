const Q = require('q');
const _ = require('lodash');
const jyson = require('jyson');

module.exports.method = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template, { undefinedValue: undefined });

  return (req, res, next) => {
    const createObject = templateFunction(req);

    return Q.when(Model.create(createObject))
    .then(model => {
      _.set(req, modelPath, model);
    })
    .then(next, next);
  };
};