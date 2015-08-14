import traverse from 'traverse'
import isPromise from 'is-promise'

export default deepResolve

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
