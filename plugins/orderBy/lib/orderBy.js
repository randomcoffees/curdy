module.exports = (curdy, options) => {
  curdy.showAll.find.getSortTemplate = () => {
    return options;
  };
};