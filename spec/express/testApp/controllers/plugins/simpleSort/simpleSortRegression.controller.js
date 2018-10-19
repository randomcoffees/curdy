const curdy = require('./../../../../../../index');
const SimpleSort = require('./simpleSortModel.model');

module.exports = curdy.generateController(
  SimpleSort,
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
).controller();