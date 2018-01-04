# curdy

Generate CRUD controllers for your express application!

[![NPM Version](https://img.shields.io/npm/v/curdy.svg)](https://www.npmjs.com/package/curdy)
[![Travis Build Status](https://img.shields.io/travis/hubba/curdy.svg)](https://travis-ci.org/hubba/curdy)
[![Coveralls](https://img.shields.io/coveralls/github/hubba/curdy.svg)](https://coveralls.io/github/hubba/curdy)
[![Gemnasium Dependency Status](https://img.shields.io/gemnasium/hubba/curdy.svg)](https://gemnasium.com/github.com/hubba/curdy)
[![NPM Downloads](https://img.shields.io/npm/dm/curdy.svg)](https://npm-stat.com/charts.html?package=curdy)


## Install
```bash
npm install curdy --save
```

## Usage

Checkout the [example curdy app](https://github.com/hubba/curdy/tree/earobinson/resolve-failing-tests/spec/express/testApp).

### Model `simple.model.js`
```js
const mongoose = require('mongoose');

module.exports = mongoose.model('SimpleModel', new mongoose.Schema({
  string: String,
  number: Number,
  date: Date,
  boolean: Boolean
}, {
  timestamps: true,
}));
```

### Controller `simpleModel.controller.js`
```js
const curdy = require('curdy');
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
```

### Routes `index.js`
```js
const express = require('express');
const Controller = require('./simpleModel.controller');
const router = express.Router();

const curdy = require('curdy');

router.use('/', curdy.generateRoutes(Controller));
// This creates the following routes
// GET    /       This is the showAll route, returning all models
// GET    /:_id   This is the show route, returning the model matched by the find
// POST   /       This is the create route, allowing the user to create a new model
// PUT    /:_id   This is the update route, allowing the user update a model
// DELETE /:_id   This is the delete route, allowing the user delete a model

module.exports = router;
```

## Goals
 - Easy to install
 - Easy to override and extend
 - Make working with CRUD simpler and faster.

 ## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions
for opening issues, coding standards, and notes on development.

***

Built with ❤️ at [Hubba](https://www.hubba.com?utm_campaign=hubba_oss).