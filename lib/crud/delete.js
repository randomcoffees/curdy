const Q = require('q');
const _ = require('lodash');

module.exports = (Model, modelPath) => {
  return (req, res, next) => {
    const model = _.get(req, modelPath);

    return Q.when(model.remove())
    .then(() => next(), next);
  };
};