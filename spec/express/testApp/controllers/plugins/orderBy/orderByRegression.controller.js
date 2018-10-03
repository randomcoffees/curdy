const curdy = require('./../../../../../../index');
const OrderModel = require('./orderedModel.model');

module.exports = curdy.generateController(
  OrderModel,
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