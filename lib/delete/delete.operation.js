const get = require('lodash.get');

const utilities = require('./../utilities');

module.exports.method = (Model, modelPath) => {
  return (req, res, next) => {
    const model = get(req, modelPath);

    return utilities.when(model.remove())
    .then(() => next(), next);
  };
};