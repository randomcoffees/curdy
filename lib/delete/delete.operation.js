const get = require('lodash.get');

module.exports.method = (Model, modelPath) => {
  return (req, res, next) => {
    const model = get(req, modelPath);

    return Promise.all([model.remove()])
    .then(() => next(), next);
  };
};