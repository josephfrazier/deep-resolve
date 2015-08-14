'use strict';

require('native-promise-only');

var test = require('tape');
var traverse = require('traverse');
var deepResolve = require('../');

test('example from traverse readme', function (t) {
  t.plan(1);

  var obj = [ 5, 6, -3, [ 7, 8, -2, 1 ], { f : 10, g : -13 } ];
  var expected = [ 5, 6, 125, [ 7, 8, 126, 1 ], { f: 10, g: 115 } ];

  traverse(obj).forEach(function (x) {
      if (x < 0) this.update(Promise.resolve(x + 128));
  });

  deepResolve(obj).then(function (resolved) {
    t.deepEqual(resolved, expected);
  })
});
