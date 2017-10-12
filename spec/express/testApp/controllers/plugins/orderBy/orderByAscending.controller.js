const curdy = require('./../../../../../../index');
const OrderModel = require('./orderedModel.model');
const OrderByPlugin = require('./../../../../../../plugins/orderBy');

module.exports = curdy.generateController(
  OrderModel,
  'orderedModel',
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
);

module.exports.plugin(OrderByPlugin, {
  createdAt: () => {
    return {createdAt: 1};
  }
});
