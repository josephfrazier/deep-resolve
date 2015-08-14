'use strict';

var traverse = require('traverse');
var isPromise = require('is-promise');

module.exports = deepResolve;

function deepResolve (obj) {
  var promises = [];

  traverse(obj).forEach(function (x) {
    if (isPromise(x)) {
      promises.push(x.then(this.update.bind(this)));
    }
  });

  return Promise.all(promises).then(function () {
    return obj;
  });
}
