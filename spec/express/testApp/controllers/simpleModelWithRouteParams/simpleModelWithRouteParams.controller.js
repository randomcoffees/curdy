const SimpleModel = require('./../../../../models/simpleModel.model');
const curdy = require('../../../../../index');

Object.assign(
  module.exports,
  curdy.generateController(SimpleModel, {
    find: {
      _id: 'params._id'
    },
    operation: {
      string: 'params.string',
      boolean: 'body.boolean',
      number: 'body.number',
    },
    render: {
      _id: '_id',
      number: 'number',
      string: 'string',
      boolean: 'boolean',
      paramString: ({ templateOpts }) => templateOpts.req.params.string,
    }
  }, {
    showAll: {
      find: {
        string: 'params.string'
      }
    }
  }).controller()
);
