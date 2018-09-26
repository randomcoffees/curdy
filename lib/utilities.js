function when(result) {
  if (!result || typeof result.then !== 'function') {
    return Promise.resolve(result);
  }

  return result;
}

module.exports = {
  when
};