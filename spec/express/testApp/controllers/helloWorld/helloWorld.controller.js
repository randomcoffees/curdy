exports.index = function(req, res) {
  return res.status(200).json({hello: 'world'});
};