const _ = require('lodash');
const jyson = require('jyson');

module.exports = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template);

  return (req, res) => {
    const model = _.get(req, modelPath);

    return res.status(200).json(templateFunction(model));
  };
};