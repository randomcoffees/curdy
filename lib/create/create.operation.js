const _ = require('lodash');
const jyson = require('jyson');

const utilities = require('./../utilities');

module.exports.method = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template, { undefinedValue: undefined });

  const x = (req, res, next) => {
    const createObject = templateFunction(req);

    return utilities.when(Model.create(createObject))
    .then(model => {
      _.set(req, modelPath, model);
    })
    .then(() => {
      return next();

    }, next);
  };

  return x;
};