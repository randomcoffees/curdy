const SimpleModel = require('../simpleModel/simpleModel.model');
const curdy = require('../../../../../index');

Object.assign(
  module.exports,
  curdy.generateController(SimpleModel, 'SimpleModel', {
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
      paramString: ({ opts }) => opts.req.params.string,
    }
  }, {
    showAll: {
      find: {
        string: 'params.string'
      }
    }
  }).controller()
);
