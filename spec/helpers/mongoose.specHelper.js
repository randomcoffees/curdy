const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

before(async () => {
  await mockgoose.prepareStorage();
  await mongoose.connection.close();
  return mongoose.connect('mongodb://example.com/TestingDB');
});