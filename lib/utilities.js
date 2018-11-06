const pluralizeImport = require('pluralize');

function when(result) {
  if (!result || typeof result.then !== 'function') {
    return Promise.resolve(result);
  }

  return result;
}

function nexter() {
  return (req, res, next) => {
    return next();
  };
}

function pluralize(string) {
  return pluralizeImport(string);
}

function singularize(string) {
  return pluralizeImport.singular(string);
}

module.exports = {
  pluralize,
  singularize,
  nexter,
  when
};