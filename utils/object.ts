// eslint-disable-next-line
export const removeNullProperties = (object: object): object =>
  Object.fromEntries(Object.entries(object).map(([key, value]) => {
    const isObject = typeof value === 'object';

    return isObject ? [key, removeNullProperties(value)] : [key, value];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }).filter(([_, value]) => {
    const isObject = typeof value === 'object';

    return isObject ? Boolean(Object.keys(value).length) : Boolean(value);
  }));
