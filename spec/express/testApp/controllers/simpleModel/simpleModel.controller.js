const curdy = require('./../../../../../index');
const SimpleModel = require('./simpleModel.model');

module.exports = curdy.generateController(
  SimpleModel, // Model
  'simpleModel', // Model name
  {
    find: { // Find Template
      _id: 'params._id'
    },
    operation: { // Operation Template
      string: 'body.string',
      number: 'body.number',
      boolean: 'body.boolean'
    },
    render: { // Render Template
      _id: '_id',
      string: 'string',
      number: 'number',
      boolean: 'boolean'
    }
  }
);