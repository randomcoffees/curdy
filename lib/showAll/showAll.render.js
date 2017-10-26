const _ = require('lodash');
const jyson = require('jyson');

module.exports.method = (Model, modelPaths, template) => {
  const templateFunction = jyson.buildTemplateFunction(template);

  return (req, res) => {
    const model = _.get(req, modelPaths);

    return res.json(templateFunction(model));
  };
};