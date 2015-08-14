import traverse from 'traverse'
import isPromise from 'is-promise'

export default deepResolve

function deepResolve (obj) {
  var t = traverse(obj);
  var promises = t.paths()
    .filter(path => isPromise(t.get(path)))
    .map(path => t.get(path).then(v => t.set(path, v)))

  return Promise.all(promises).then(() => obj);
}
