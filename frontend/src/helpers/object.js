export function mapObject(obj, fn) {
  const keys = Object.keys(obj);
  const transformedArray = keys.map(key => [key, fn(obj[key], key, obj)]);
  return Object.fromEntries(transformedArray);
}
