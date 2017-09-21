const Q = require('q');
const _ = require('lodash');
const jyson = require('jyson');

module.exports = (Model, modelPaths, template) => {
  const templateFunction = jyson.buildTemplateFunction(template);

  return (req, res, next) => {
    return Model.find(templateFunction(req)).sort({_id: 1})
    .then(models => {
      _.set(req, modelPaths, models);
    })
    .then(next, next);
  };
};