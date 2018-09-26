module.exports = (curdy) => {
  curdy.showAll.find.getSkipTemplate = () => {
    return {
      skip: ({ object }) => {
        if (object.query && object.query.skip) {
          return parseInt(object.query.skip);
        }
        return 0;
      }
    };
  };

  curdy.showAll.find.getLimitTemplate = () => {
    return {
      limit: ({ object }) => {
        if (object.query && object.query.limit) {
          return parseInt(object.query.limit);
        }
        return 20;
      }
    };
  };
};