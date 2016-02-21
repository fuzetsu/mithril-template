/* global app m util */
(function() {

  var SERVER_URL = '/api/';
  var CACHE = {};

  var get = function(path) {
    if (path in CACHE) return m.prop(CACHE[path]);
    var args = [].slice.call(arguments);
    return app.mutil.requestWithLoader({
      method: 'get',
      url: SERVER_URL + path
    }).then(function(data) {
      CACHE[path] = data;
      return data;
    });
  };

  var post = function(path, data) {
    return app.mutil.requestWithLoader({
      method: 'post',
      url: SERVER_URL + path,
      data: data
    });
  };

  app.model.SomeModel = {};

}());
