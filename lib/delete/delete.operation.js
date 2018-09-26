const _ = require('lodash');

module.exports.method = (Model, modelPath) => {
  return (req, res, next) => {
    const model = _.get(req, modelPath);

    return Promise.all([model.remove()])
    .then(() => next(), next);
  };
};