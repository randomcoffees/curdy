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

module.exports = {
  when,
  nexter
};