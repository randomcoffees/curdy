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
)
.plugin(SimpleSortPlugin, ['createdAt', {sortKey: 'u', attributePath: 'updatedAt'}])
.controller();