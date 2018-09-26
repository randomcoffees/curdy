const set = require('lodash.set');
const jyson = require('jyson');

module.exports.method = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template);

  return (req, res, next) => {
    return Model.findOne(templateFunction(req))
    .then((model) => {
      if (!model) {
        return Promise.reject({
          message: `${Model.modelName} not found`,
          name: 'NotFound',
          code: 404,
          modelName: Model.modelName
        });
      }

      set(req, modelPath, model);
    })
    .then(next, next);
  };
};