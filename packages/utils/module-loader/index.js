var _isEmpty = function(o) {
  return (
    o == null ||
    (o instanceof Array && o.length == 0) ||
    (typeof o == "object" && Object.keys(o).length == 0)
  );
};

var _cache = {};

// Run remote code

var _eval = function(data) {
  var module = { exports: {} };

  (function() {
    var exports = {};

    try {
      eval(data);
    } catch (ex) {
      throw new Error("Exception evaluating remote code '" + data + "'");
    }
    if (!_isEmpty(exports) && _isEmpty(module.exports))
      module.exports = exports;
  })();
  return module.exports;
};

var _syncRequire = function(url, force) {
  if (!force && _cache[url] != null) return _cache[url];

  var httpsync = require("urllib-sync").request,
    res = httpsync(url),
    data = res.data.toString();

  if (!data) {
    console.log("Got no data. Status was: " + res.status);
    return null;
  }

  // Eval the code

  _cache[url] = _eval(data);
  return _cache[url];
};

module.exports = {
  syncRequire: _syncRequire
};
