const get = require('lodash.get');
const set = require('lodash.set');
const express = require('express');

const utilities = require('./utilities');

const generateMethod = (method, model, modelName, template, templateOverride) => {
  return method(
    model,
    modelName,
    templateOverride || template
  );
};

module.exports.generateController = (model, templates, opts = { templateOverrides: { create: {}, delete: {}, show: {}, showAll: {}, update: {} } }) => {
  const { modelName } = model;

  // showAll.find
  if (!get(opts, 'templateOverrides.showAll.find')) {
    set(opts, 'templateOverrides.showAll.find', {});
  }

  // delete.render
  if (!get(opts, 'templateOverrides.delete.render')) {
    set(opts, 'templateOverrides.delete.render', {
      success: () => {
        return true;
      }
    });
  }

  const methodNames = ['create', 'delete', 'show', 'showAll', 'update'];
  const methodStages = ['find', 'operation', 'render'];
  const controller = {
    create: require('./create'),
    delete: require('./delete'),
    show: require('./show'),
    showAll: require('./showAll'),
    update: require('./update')
  };

  controller.plugin = (plugin, options) => {
    plugin(controller, options);
    return controller;
  };

  controller.controller = () => {
    const controllerMethods = {};

    methodNames.forEach((methodName) => {
      controllerMethods[methodName] = {};
      controllerMethods[methodName].pre = {};
      controllerMethods[methodName].post = {};

      methodStages.forEach((stageName) => {
        controllerMethods[methodName][stageName] = generateMethod(
          controller[methodName][stageName].method,
          model,
          modelName,
          templates[stageName],
          opts.templateOverrides[methodName] ? opts.templateOverrides[methodName][stageName] : null
        );

        controllerMethods[methodName].pre[stageName] = utilities.nexter();
        controllerMethods[methodName].post[stageName] = utilities.nexter();
      });
    });

    return controllerMethods;
  };

  return controller;
};

module.exports.generateRoutes = (Controller, isRouting = { create: true, delete: true, show: true, showAll: true, update: true }, idString = ':_id', routerOpts = {}) => {
  const router = express.Router(Object.assign({
    mergeParams: true,
    strict: false,
    caseSensitive: false,
  }, routerOpts));

  if (isRouting.create) {
    router.post(
      '/',
      Controller.create.pre.find,
      Controller.create.find,
      Controller.create.post.find,

      Controller.create.pre.operation,
      Controller.create.operation,
      Controller.create.post.operation,

      Controller.create.pre.render,
      Controller.create.render,
      Controller.create.post.render
    );
  }
  if (isRouting.delete) {
    router.delete(
      `/${idString}`,
      Controller.delete.pre.find,
      Controller.delete.find,
      Controller.delete.post.find,

      Controller.delete.pre.operation,
      Controller.delete.operation,
      Controller.delete.post.operation,

      Controller.delete.pre.render,
      Controller.delete.render,
      Controller.delete.post.render
    );
  }
  if (isRouting.show) {
    router.get(
      `/${idString}`,
      Controller.show.pre.find,
      Controller.show.find,
      Controller.show.post.find,

      Controller.show.pre.operation,
      Controller.show.operation,
      Controller.show.post.operation,

      Controller.show.pre.render,
      Controller.show.render,
      Controller.show.post.render
    );
  }
  if (isRouting.showAll) {
    router.get(
      '/',
      Controller.showAll.pre.find,
      Controller.showAll.find,
      Controller.showAll.post.find,

      Controller.showAll.pre.operation,
      Controller.showAll.operation,
      Controller.showAll.post.operation,

      Controller.showAll.pre.render,
      Controller.showAll.render,
      Controller.showAll.post.render
    );
  }
  if (isRouting.update) {
    router.put(
      `/${idString}`,
      Controller.update.pre.find,
      Controller.update.find,
      Controller.update.post.find,

      Controller.update.pre.operation,
      Controller.update.operation,
      Controller.update.post.operation,

      Controller.update.pre.render,
      Controller.update.render,
      Controller.update.post.render
    );
  }

  return router;
};

module.exports.plugins = require('./../plugins');