let state = 0

module.exports = function (app) {
  app.get('/some/path', function(req, res) {
    state += 1;
    res.json({ 
      custom: 'response',
      state: state
    });
  });
}