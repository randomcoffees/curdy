const curdy = require('../../../../../../index');
const ArraySubDocumentModel = require('./../../../../../models/arraySubDocumentModel.model');
const ArraySubDocument = curdy.plugins.arraySubDocument;

module.exports = curdy.generateController(
  ArraySubDocumentModel,
  {
    find: {
      _id: 'params._id'
    },
    operation: {
      string: 'body.string',
      number: 'body.number',
      boolean: 'body.boolean',
      list: [{
        _id: 'body.list.$._id',
        string: 'body.list.$.string',
        number: 'body.list.$.number',
        boolean: 'body.list.$.boolean',
        list: [{
          _id: 'body.list.$.list.$._id',
          string: 'body.list.$.list.$.string',
          number: 'body.list.$.list.$.number',
          boolean: 'body.list.$.list.$.boolean'
        }]
      }]
    },
    render: {
      string: 'string',
      number: 'number',
      boolean: 'boolean',
      list: [{
        _id: 'list.$._id',
        string: 'list.$.string',
        number: 'list.$.number',
        boolean: 'list.$.boolean',
        list: [{
          _id: 'list.$.list.$._id',
          string: 'list.$.list.$.string',
          number: 'list.$.list.$.number',
          boolean: 'list.$.list.$.boolean'
        }]
      }]
    }
  }
)
.plugin(ArraySubDocument, {})
.controller();
