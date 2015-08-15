import traverse from 'traverse'
import isPromise from 'is-promise'

export default obj => {
  const t = traverse(obj);
  const promises = t.paths()
    .map(path => ({path, node: t.get(path)}))
    .filter(({path, node}) => isPromise(node))
    .map(({path, node}) => node.then(value => t.set(path, value)))

  return Promise.all(promises).then(() => obj);
}
