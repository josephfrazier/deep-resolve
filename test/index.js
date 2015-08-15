import 'native-promise-only'

import test from 'tape'
import traverse from 'traverse'
import deepResolve from '../'

test('example from traverse readme', t => {
  t.plan(1);

  var obj =      [ 5, 6,  -3, [ 7, 8,  -2, 1 ], { f: 10, g: -13 } ];
  var expected = [ 5, 6, 125, [ 7, 8, 126, 1 ], { f: 10, g: 115 } ];

  traverse(obj).forEach(function (x) {
      if (x < 0) this.update(Promise.resolve(x + 128));
  });

  deepResolve(obj).then(resolved => t.deepEqual(resolved, expected))
});
