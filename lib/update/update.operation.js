const set = require('lodash.set');
const get = require('lodash.get');
const merge = require('lodash.merge');
const jyson = require('jyson');

const utilities = require('./../utilities');

module.exports.method = (Model, modelPath, template) => {
  const templateFunction = jyson.buildTemplateFunction(template, { undefinedValue: null, emptyArrayValue: [] });

  return (req, res, next) => {
    const model = get(req, modelPath);

    const templateResult = templateFunction(req);
    console.log({ templateResult });
    // merge(model, templateFunction(req));
    for(const key in templateResult) {
      set(model, key, templateResult[key]);
    }

    return utilities.when(model.save())
    .then(() => next(), next);
  };
};