const _ = require('lodash');
const jyson = require('jyson');

module.exports.method = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template, { undefinedValue: undefined });

  return (req, res, next) => {
    const model = _.get(req, modelPath);

    _.merge(model, templateFunction(req));

    return Promise.all([model.save()])
    .then(() => next(), next);
  };
};