const get = require('lodash.get');
const jyson = require('jyson');

module.exports.method = (Model, modelPaths, template) => {
  const templateFunction = jyson.buildTemplateFunction(template);

  return (req, res) => {
    const model = get(req, modelPaths);

    return res.json(templateFunction(model, { req }));
  };
};