import traverse from 'traverse'
import isPromise from 'is-promise'

export default deepResolve

function deepResolve (obj) {
  var t = traverse(obj);
  var promises = t.paths()
    .map(path => ({path, node: t.get(path)}))
    .filter(({path, node}) => isPromise(node))
    .map(({path, node}) => node.then(value => t.set(path, value)))

  return Promise.all(promises).then(() => obj);
}
