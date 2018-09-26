const get = require('lodash.get');
const jyson = require('jyson');

module.exports.method = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template);

  return (req, res) => {
    const model = get(req, modelPath);

    return res.status(201).json(templateFunction(model, { req }));
  };
};