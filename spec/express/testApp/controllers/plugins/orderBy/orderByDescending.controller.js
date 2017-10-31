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
).plugin(OrderByPlugin, {
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