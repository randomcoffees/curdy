const camelCase = require('lodash.camelcase');
const get = require('lodash.get');
const jyson = require('jyson');

const utilities = require('./../utilities');

module.exports.method = (Model, modelPath, template, opts = {}) => {
  const templateFunction = jyson.buildTemplateFunction(template);
  const modelWrapper = get(opts, 'modelWrapper', utilities.singularize(camelCase(Model.modelName)));

  return (req, res) => {
    const model = get(req, modelPath);

    return res.status(get(opts, 'statusCode', 200)).json({
      [modelWrapper]: templateFunction(model, { req })
    });
  };
};