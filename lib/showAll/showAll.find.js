const set = require('lodash.set');
const jyson = require('jyson');

// This is so that a plugin can extend this method
module.exports.getFindTemplate = (template) => {
  return template;
};

// This is so that a plugin can extend this method
module.exports.getSortTemplate = () => {
  return {
    sort: () => {
      return { _id: 1 };
    }
  };
};

// This is so that a plugin can extend this method
module.exports.getSkipTemplate = () => {
  return {
    skip: () => {
      // undefined === dont skip
      return undefined;
    }
  };
};

// This is so that a plugin can extend this method
module.exports.getLimitTemplate = () => {
  return {
    limit: () => {
      // undefined === dont limit
      return undefined;
    }
  };
};

module.exports.method = (Model, modelPaths, template) => {
  const findTemplateFunction = jyson.buildTemplateFunction(module.exports.getFindTemplate(template));
  const sortTemplateFunction = jyson.buildTemplateFunction(module.exports.getSortTemplate(template));
  const skipTemplateFunction = jyson.buildTemplateFunction(module.exports.getSkipTemplate(template));
  const limitTemplateFunction = jyson.buildTemplateFunction(module.exports.getLimitTemplate(template));

  return (req, res, next) => {
    return Model.find(findTemplateFunction(req))
    .sort(sortTemplateFunction(req).sort)
    .skip(skipTemplateFunction(req).skip)
    .limit(limitTemplateFunction(req).limit)
    .then((models) => {
      set(req, modelPaths, models);
    })
    .then(next, next);
  };
};