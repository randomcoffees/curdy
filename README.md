# curdy

Generate CRUD controllers for your express application!

[![Build Status](https://api.travis-ci.org/hubba/curdy.svg?branch=master)](https://travis-ci.org/hubba/curdy)
[![npm version](https://badge.fury.io/js/curdy.svg)](https://badge.fury.io/js/curdy)
[![Dependency Status](https://gemnasium.com/badges/github.com/hubba/curdy.svg)](https://gemnasium.com/github.com/hubba/curdy)


## Install
```bash
npm install curdy --save
```

## Usage

jyson can create many different types of templates, for a full list of examples check out the [example tests](https://github.com/hubba/jyson/blob/master/spec/lib/jyson/jyson.example.spec.js).

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

***

Built with ❤️ at [Hubba](https://www.hubba.com?utm_campaign=hubba_oss).