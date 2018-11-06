const get = require('lodash.get');

function merge(model, templateResult, options, path = []) {
  for (const key in templateResult) {
    const pathString = path.concat([key]).join('.');
    const value = get(templateResult, key);
    // Array
    if (Array.isArray(value)) {
      // if (!get(model, pathString)) {
      //   model.set(pathString, []);
      // }

      for (let i = 0; i < value.length; i++) {
        let modelIndex = i;

        if(value[i][options.id]) {
          modelIndex = get(model, pathString, []).findIndex((element) => {
            return element[options.id].toString() === value[i][options.id].toString();
          });
        } else {
          modelIndex = get(model, pathString, []).length;
        }

        merge(model, value[i], options, path.concat([key, modelIndex]));
      }

      if(value.length > 0) {
        model.markModified(pathString);
      }

      continue;
    }

    // Object
    if(typeof value === 'object') {
      merge(model, templateResult[key], options, path.concat([key]));
      continue;
    }

    console.log({ pathString, value });
    model.set(pathString, value);
  }
}

// module.exports = (curdy, options) => {
module.exports = (curdy, options = {}) => {
  curdy.update.operation.merge = (model, templateResult) => {
    merge(model, templateResult, Object.assign({ id: '_id' }, options));
  };
};