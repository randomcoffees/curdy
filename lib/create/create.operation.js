const set = require('lodash.set');
const jyson = require('jyson');

const utilities = require('./../utilities');

module.exports.method = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template, { undefinedValue: undefined });

  return (req, res, next) => {
    const createObject = templateFunction(req);

    return utilities.when(Model.create(createObject))
    .then((model) => {
      set(req, modelPath, model);
    })
    .then(() => {
      return next();

    }, next);
  };
};