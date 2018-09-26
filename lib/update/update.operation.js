const get = require('lodash.get');
const merge = require('lodash.merge');
const jyson = require('jyson');

const utilities = require('./../utilities');

module.exports.method = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template, { undefinedValue: undefined });

  return (req, res, next) => {
    const model = get(req, modelPath);

    merge(model, templateFunction(req));

    return utilities.when(model.save())
    .then(() => next(), next);
  };
};