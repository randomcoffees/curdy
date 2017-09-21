const curddy = require('./../../../../../index');
const SimpleModel = require('./simpleModel.model');

module.exports = curddy.generateController(
  SimpleModel, // Model
  'simpleModel', // Model name
  {
    find: { // Find Template
      _id: 'params._id'
    },
    crud: { // Crud Template
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