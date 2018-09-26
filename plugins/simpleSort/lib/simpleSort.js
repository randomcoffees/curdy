module.exports = (curdy, options) => {
  const expandedOptions = options.map((option) => {
    if (typeof option === 'string' || option instanceof String) {
      return { sortKey: option, attributePath: option };
    }

    return option;
  });

  const defaultSort = { [expandedOptions[0].attributePath]: -1 };

  curdy.showAll.find.getSortTemplate = () => {
    return {
      sort: ({ object }) => {
        if (!object.query || !object.query.sort) {
          return defaultSort;
        }

        const sort = object.query.sort.split(':');
        const expandedOption = expandedOptions.find((expandedOptionCandidate) => {
          return expandedOptionCandidate.sortKey.toLowerCase() === sort[0].toLowerCase();
        });

        if (!expandedOption) {
          return defaultSort;
        }

        return {
          [expandedOption.attributePath]: (sort[1].toLowerCase() === 'asc' ? 1 : -1)
        };
      }
    };
  };
};