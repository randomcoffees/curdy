const Q = require('q');
const _ = require('lodash');
const jyson = require('jyson');

module.exports = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template, { undefinedValue: undefined });

  return (req, res, next) => {
    const model = _.get(req, modelPath);

    _.merge(model, templateFunction(req));

    return Q.when(model.save())
    .then(() => next(), next);
  };
};