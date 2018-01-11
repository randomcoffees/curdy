const curdy = require('./../../../../../../index');
const SimpleSortModel = require('./simpleSortModel.model');
const SimpleSortPlugin = curdy.plugins.simpleSort;

module.exports = curdy.generateController(
  SimpleSortModel,
  'simpleSortModel',
  {
    find: {
      _id: 'params._id'
    },
    operation: {
      name: 'body.name',
    },
    render: {
      _id: '_id',
      name: 'name',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
).plugin(SimpleSortPlugin, {
  sort: ({object}) => {
    if (object.query && object.query.sort) {
      const sort = object.query.sort.split(':');
      return {
        [sort[0]]: (sort[1].toLowerCase() === 'asc' ? 1 : -1)
      };
    }
    return {createdAt: -1};
  }
}).controller();