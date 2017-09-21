const _ = require('lodash');
const express = require('express');

const nexter = require('./nexter');

module.exports = {
  crud: require('./crud'),
  find: require('./find'),
  render: require('./render'),
};

const generateMethods = (methodNames, methodObject, model, modelName, template, templateOverrides) => {
  const generatedMethods = {};

  methodNames.forEach(methodName => {
    generatedMethods[methodName] = methodObject[methodName](
      model,
      modelName,
      templateOverrides[methodName] || template
    );
  });

  return generatedMethods;
};

module.exports.generateController = (model, modelName, templates, templateOverrides = { find: {}, crud: {}, render: {}}) => {
  // find.showAll
  if (!_.get(templateOverrides, 'find.showAll')) {
    _.set(templateOverrides, 'find.showAll', {});
  }

  // render.delete
  if (!_.get(templateOverrides, 'render.delete')) {
    _.set(templateOverrides, 'render.delete', {
      success: () => {
        return true;
      }
    });
  }

  const methodNames = ['create', 'delete', 'show', 'showAll', 'update'];
  const controller = {};

  ['find', 'crud', 'render'].forEach(stageName => {
    controller[stageName] = generateMethods(
      methodNames,
      module.exports[stageName],
      model,
      modelName,
      templates[stageName],
      templateOverrides[stageName]
    );

    controller[stageName].pre = {};
    controller[stageName].post = {};

    methodNames.forEach(methodName => {
      controller[stageName].pre[methodName] = nexter();
      controller[stageName].post[methodName] = nexter();
    });
  });

  return controller;
};

module.exports.generateRoutes = (Controller, isRouting = { create: true, delete: true, show: true, showAll: true, update: true}, idString = ':_id') => {
  const router = express.Router();

  if (isRouting.create) {
    router.post(
      '/',
      Controller.find.pre.create,
      Controller.find.create,
      Controller.find.post.create,

      Controller.crud.pre.create,
      Controller.crud.create,
      Controller.crud.post.create,

      Controller.render.pre.create,
      Controller.render.create,
      Controller.render.post.create
    );
  }
  if (isRouting.delete) {
    router.delete(
      `/${idString}`,
      Controller.find.pre.delete,
      Controller.find.delete,
      Controller.find.post.delete,

      Controller.crud.pre.delete,
      Controller.crud.delete,
      Controller.crud.post.delete,

      Controller.render.pre.delete,
      Controller.render.delete,
      Controller.render.post.delete
    );
  }
  if (isRouting.show) {
    router.get(
      `/${idString}`,
      Controller.find.pre.show,
      Controller.find.show,
      Controller.find.post.show,

      Controller.crud.pre.show,
      Controller.crud.show,
      Controller.crud.post.show,

      Controller.render.pre.show,
      Controller.render.show,
      Controller.render.post.show
    );
  }
  if (isRouting.showAll) {
    router.get(
      '/',
      Controller.find.pre.showAll,
      Controller.find.showAll,
      Controller.find.post.showAll,

      Controller.crud.pre.showAll,
      Controller.crud.showAll,
      Controller.crud.post.showAll,

      Controller.render.pre.showAll,
      Controller.render.showAll,
      Controller.render.post.showAll
    );
  }
  if (isRouting.update) {
    router.put(
      `/${idString}`,
      Controller.find.pre.update,
      Controller.find.update,
      Controller.find.post.update,

      Controller.crud.pre.update,
      Controller.crud.update,
      Controller.crud.post.update,

      Controller.render.pre.update,
      Controller.render.update,
      Controller.render.post.update
    );
  }

  return router;
};