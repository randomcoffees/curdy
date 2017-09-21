const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

before(() => {
  return mockgoose.prepareStorage()
  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => {
    return mongoose.connect('mongodb://example.com/TestingDB');
  });
});

beforeEach(() => {
  Object.keys(mongoose.connection.models).forEach(modelKey => {
    delete mongoose.connection.models[modelKey];
  });
});