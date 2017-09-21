// This simply calls next, no work is done
module.exports = () => {
  return (req, res, next) => {
    return next();
  };
};